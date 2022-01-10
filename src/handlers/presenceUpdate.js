handlePresenceUpdateEvent = async(client, oldPresence, newPresence) => {
  try {
    if (!oldPresence) return;
    let emitted = false;

    if (oldPresence.status !== 'offline' && newPresence.status === 'offline') {
        client.emit('guildMemberOffline', newPresence.member, oldPresence.status);
        emitted = true;
    }

    if (oldPresence.status === 'offline' && newPresence.status !== 'offline') {
        client.emit('guildMemberOnline', newPresence.member, newPresence.status);
        emitted = true;
    }

    if (!emitted) {
        client.emit('unhandledPresenceUpdate', oldPresence, newPresence);
    }
  } catch {}
}

module.exports = { handlePresenceUpdateEvent }