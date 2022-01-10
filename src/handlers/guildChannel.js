handleChannelUpdateEvent = async(client, oldChannel, newChannel) => {
  try {
    let emitted = false;

    if (Object.prototype.hasOwnProperty.call(oldChannel, 'guild')) {
      if (oldChannel.permissionOverwrites !== newChannel.permissionOverwrites) {
        client.emit('guildChannelPermissionsUpdate', newChannel, oldChannel.permissionOverwrites, newChannel.permissionOverwrites);
        emitted = true;
      }

      if (oldChannel.type === 'GUILD_TEXT' && oldChannel.topic !== newChannel.topic) {
        client.emit('guildChannelTopicUpdate', newChannel, oldChannel.topic, newChannel.topic);
        emitted = true;
      }
    }

    if (!emitted) {
      client.emit('unhandledGuildChannelUpdate', oldChannel, newChannel);
    }
  } catch {}
}

module.exports = { handleChannelUpdateEvent }