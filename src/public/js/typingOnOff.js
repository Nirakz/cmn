function typingOn(divId) {
  let targetId = $(`#write-chat-${divId}`).data("chat");
  
  if ($(`#write-chat-${divId}`).hasClass("chat-in-group")) {
    socket.emit("user-is-typing", {
      groupId: targetId,
      typingGroup: true
    });
  } else {
    socket.emit("user-is-typing", {contactId: targetId});
  }
}

function typingOff(divId) {
  let targetId = $(`#write-chat-${divId}`).data("chat");
  
  if ($(`#write-chat-${divId}`).hasClass("chat-in-group")) {
    socket.emit("user-is-not-typing", {
      groupId: targetId,
      typingGroup: true
    });
  } else {
    socket.emit("user-is-not-typing", {contactId: targetId});
  }
}

$(document).ready(function() {
  // listen typing on
  socket.on("response-user-is-typing", function(response) {
    let messageTyping = `
      <div class="bubble you bubble-typing-gif">
        <img src="/images/chat/typing.gif">
      </div>
    `;

    if (response.currentGroupId) {
      if (response.currentUserId !== $("#dropdown-navbar-user").data("uid")) {
        let check = $(`.chat[data-chat=${response.currentGroupId}]`).find("div.bubble-typing-gif");
        if (check.length) {
          return false;
        }

        $(`.chat[data-chat=${response.currentGroupId}]`).append(messageTyping);
        $(`.right .chat[data-chat = ${response.currentGroupId}]`).scrollTop($(`.right .chat[data-chat = ${response.currentGroupId}]`)[0].scrollHeight);
      }
    } else {
      let check = $(`.chat[data-chat=${response.currentUserId}]`).find("div.bubble-typing-gif");
      if (check.length) {
        return false;
      }

      $(`.chat[data-chat=${response.currentUserId}]`).append(messageTyping);
      $(`.right .chat[data-chat = ${response.currentUserId}]`).scrollTop($(`.right .chat[data-chat = ${response.currentUserId}]`)[0].scrollHeight);
    }
  });

  // listen typing off
  socket.on("response-user-is-not-typing", function(response) {
    if (response.currentGroupId) {
      if (response.currentUserId !== $("#dropdown-navbar-user").data("uid")) {
        $(`.chat[data-chat=${response.currentGroupId}]`).find("div.bubble-typing-gif").remove();
        $(`.right .chat[data-chat = ${response.currentGroupId}]`).scrollTop($(`.right .chat[data-chat = ${response.currentGroupId}]`)[0].scrollHeight);
      }
    } else {
      $(`.chat[data-chat=${response.currentUserId}]`).find("div.bubble-typing-gif").remove();
      $(`.right .chat[data-chat = ${response.currentUserId}]`).scrollTop($(`.right .chat[data-chat = ${response.currentUserId}]`)[0].scrollHeight);
    }
  });
});
