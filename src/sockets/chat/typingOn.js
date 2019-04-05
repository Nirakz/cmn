import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from "./../../helpers/socketHelper";

/**
 * @param io from socket.jo library 
 */
let typingOn = (io) => {
  let clients = {};
  let groupId = "";

  io.on("connection", (socket) => {
    clients = pushSocketIdToArray(clients, socket.request.user._id, socket.id);

    socket.on("storage-socket-id-to-group-chat", (data) => {
      clients = pushSocketIdToArray(clients, data.groupId, socket.id);
      groupId = data.groupId;
    });

    socket.on("user-is-typing", (data) => {
      if (data.typingGroup) {
        let responseToGroup = {
          currentGroupId: data.groupId,
          currentUserId: socket.request.user._id
        };
        if (clients[data.groupId]) {
          emitNotifyToArray(clients, data.groupId, io, "response-user-is-typing", responseToGroup);
        }
      } else {
        let responseToUser = {
          currentUserId: socket.request.user._id
        };
        if (clients[data.contactId]) {
          emitNotifyToArray(clients, data.contactId, io, "response-user-is-typing", responseToUser);
        }
      }
    });

    socket.on("disconnect", () => {
      clients = removeSocketIdFromArray(clients, socket.request.user._id, socket);
      if (groupId.length) {
        clients = removeSocketIdFromArray(clients, groupId, socket);
      }
    });
  });
};

module.exports = typingOn;
