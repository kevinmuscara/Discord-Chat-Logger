handleMessageUpdateEvent = async(client, oldMessage, newMessage) => {
  try {
    let emitted = false;
    if (!oldMessage.partial && !newMessage.partial) {
      if (!oldMessage.pinned && newMessage.pinned) {
        client.emit('messagePinned', newMessage);
        emitted = true;
      }

      if (oldMessage.content !== newMessage.content) {
        client.emit('messageContentEdited', newMessage, oldMessage.content, newMessage.content);
        emitted = true;
      }
    }

    if (!emitted) {
      client.emit('unhandledMessageUpdate', oldMessage, newMessage);
    }
  } catch {}
}

module.exports = { handleMessageUpdateEvent }