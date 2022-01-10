handleThreadUpdateEvent = async(client, oldThread, newThread) => {
  try {
    let emitted = false;

    if (Object.prototype.hasOwnProperty.call(oldThread, 'guild')) {
      if (oldThread.archived !== newThread.archived) {
        client.emit('threadStateUpdate', oldThread, newThread);
        emitted = true;
      }

      if (oldThread.name !== newThread.name) {
        client.emit('threadNameUpdate', newThread, oldThread.name, newThread.name);
        emitted = true;
      }

      if (oldThread.locked !== newThread.locked) {
        client.emit('threadLockStateUpdate', oldThread, newThread);
        emitted = true;
      }

      if (oldThread.rateLimitPerUser !== newThread.rateLimitPerUser) {
        client.emit('threadRateLimitPerUserUpdate', newThread, oldThread.rateLimitPerUser, newThread.rateLimitPerUser);
        emitted = true;
      }

      if (oldThread.autoArchiveDuration !== newThread.autoArchiveDuration) {
        client.emit('threadAutoArchiveDurationUpdate', newThread, oldThread.autoArchiveDuration, newThread.autoArchiveDuration);
        emitted = true;
      }
    }

    if (!emitted) {
      client.emit('unhandledThreadUpdate', oldThread, newThread);
    }
  } catch {}
}

module.exports = { handleThreadUpdateEvent }