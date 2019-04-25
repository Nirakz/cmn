import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from "./../../helpers/socketHelper";

/**
 * @param io from socket.jo library 
 */
let userOnlineOffline = (io) => {
  let clients = {};
  io.on("connection", (socket) => {
    clients = pushSocketIdToArray(clients, socket.request.user._id, socket.id);
    socket.request.user.chatGroupIds.forEach(group => {
      clients = pushSocketIdToArray(clients, group._id, socket.id);
    });

    // Step 01: emit to user after login
    socket.emit("server-send-list-users-online", Object.keys(clients));

    // Step 02: emit to all another users when new user online
    socket.broadcast.emit("server-send-when-new-user-online", socket.request.user._id);

    socket.on("disconnect", () => {
      clients = removeSocketIdFromArray(clients, socket.request.user._id, socket);
      socket.request.user.chatGroupIds.forEach(group => {
        clients = removeSocketIdFromArray(clients, group._id, socket);
      });

      // Step 03: emit to all another users when new user offline
      socket.broadcast.emit("server-send-when-new-user-offline", socket.request.user._id);
    });
  });
};

module.exports = userOnlineOffline;
