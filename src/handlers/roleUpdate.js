handleRoleUpdateEvent = async(client, oldRole, newRole) => {
  try {
    let emitted = false;

    if (oldRole.rawPosition !== newRole.rawPosition) {
        client.emit('rolePositionUpdate', newRole, oldRole.rawPosition, newRole.rawPosition);
        emitted = true;
    }

    if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
        client.emit('rolePermissionsUpdate', newRole, oldRole.permissions.bitfield, newRole.permissions.bitfield);
        emitted = true;
    }

    if (!emitted) {
        client.emit('unhandledRoleUpdate', oldRole, newRole);
    }
  } catch {}
}

module.exports = { handleRoleUpdateEvent }