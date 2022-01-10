handleUserUpdateEvent = async(client, oldUser, newUser) => {
  try {
    let emitted = false;

    if (!oldUser.partial) {
      if (oldUser.displayAvatarURL() !== newUser.displayAvatarURL()) {
        client.emit('userAvatarUpdate', newUser, oldUser.displayAvatarURL(), newUser.displayAvatarURL());
        emitted = true;
      }

      if (oldUser.username !== newUser.username) {
        client.emit('userUsernameUpdate', newUser, oldUser.username, newUser.username);
        emitted = true;
      }

      if (oldUser.discriminator !== newUser.discriminator) {
        client.emit('userDiscriminatorUpdate', newUser, oldUser.discriminator, newUser.discriminator);
        emitted = true;
      }

      if (oldUser.flags !== newUser.flags) {
        client.emit('userFlagsUpdate', newUser, oldUser.flags, newUser.flags);
        emitted = true;
      }
    }

    if (!emitted) {
      client.emit('unhandledUserUpdate', oldUser, newUser);
    }
  } catch {}
}

module.exports = { handleUserUpdateEvent }