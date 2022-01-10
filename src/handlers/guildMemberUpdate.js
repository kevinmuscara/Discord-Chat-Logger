handleGuildMemberUpdateEvent = async(client, oldMember, newMember) => {
  try {
    let emitted = false;

    if (!oldMember.partial) {
        if (!oldMember.premiumSince && newMember.premiumSince) {
            client.emit('guildMemberBoost', newMember);
            emitted = true;
        }

        if (oldMember.premiumSince && !newMember.premiumSince) {
            client.emit('guildMemberUnboost', newMember);
            emitted = true;
        }

        const addedRoles = [];
        newMember.roles.cache.forEach((role) => {
            if (!oldMember.roles.cache.has(role.id)) addedRoles.push(role);
        });

        addedRoles.forEach((role) => {
            client.emit('guildMemberRoleAdd', oldMember, role);
            emitted = true;
        });

        const removedRoles = [];
        oldMember.roles.cache.forEach((role) => {
            if (!newMember.roles.cache.has(role.id)) removedRoles.push(role);
        });

        removedRoles.forEach((role) => {
            client.emit('guildMemberRoleRemove', oldMember, role);
            emitted = true;
        });

        if (oldMember.nickname !== newMember.nickname) {
            client.emit('guildMemberNicknameUpdate', newMember, oldMember.nickname, newMember.nickname);
            emitted = true;
        }

        if (oldMember.pending !== newMember.pending) {
            client.emit('guildMemberEntered', newMember);
            emitted = true;
        }
    }
    
    if (!emitted) {
        client.emit('unhandledGuildMemberUpdate', oldMember, newMember);
    }
  } catch {}
}

module.exports = { handleGuildMemberUpdateEvent }