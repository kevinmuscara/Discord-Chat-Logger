const { database } = require('../');

handleAllEvents = async(client) => {
  try {    
    client.on("guildChannelPermissionsUpdate", (channel, oldPermissions, newPermissions) => {
      database.insertData('events', `event_name, event_status`, `'Channel Permissions Update', '${channel.name} permissions updated.'`).then(res => {
        if(res.status === 200) console.log(`[Channel Permissions Update] ${channel.name}'s permissions updated.`)
      })
    });
    
    client.on("guildChannelTopicUpdate", (channel, oldTopic, newTopic) => {
      database.insertData('events', `event_name, event_status`, `'Channel Topic Update', '${channel.name} topic changed to ${newTopic}'`).then(res => {
        if(res.status === 200) console.log(`[Channel Topic Update] ${channel.name} topic changed to ${newTopic}.`)
      })
    });
    
    client.on("unhandledGuildChannelUpdate", (oldChannel, newChannel) => {
      database.insertData('events', `event_name, event_status`, `'Unhandled Guild Channel Update', '${oldChannel.id} was updated with unknown changes.'`).then(res => {
        if(res.status === 200) console.log(`[Unhandled Guild Channel Update]: ${oldChannel.id} was changed with unknown changes`)
      })
    });
    
    client.on("guildMemberBoost", (member) => {
      database.insertData(`events`, `event_name, event_status`, `'Member Boost', '${member.user.tag} has started boosting ${member.guild.name}.'`).then(res => {
        if(res.status === 200) console.log(`[Member Boost] ${member.user.tag} has started boosting ${member.guild.name}`)
      })
    });
    
    client.on("guildMemberUnboost", (member) => {
      database.insertData(`events`, `event_name, event_status`, `'Member Unboost', '${member.user.tag} has stopped boosting ${member.guild.name}.'`).then(res => {
        if(res.status === 200) console.log(`[Member Unboost] ${member.user.tag} has stopped boosting ${member.guild.name}`)
      })
    });
    
    client.on("guildMemberRoleAdd", (member, role) => {
      database.insertData(`events`, `event_name, event_status`, `'Member Role Add', '${member.user.tag} has acquired the role ${role.name}.'`).then(res => {
        if(res.status === 200) console.log(`[Member Role Add] ${member.user.tag} has acquired the role ${role.name}`)
      })
    });
    
    client.on("guildMemberRoleRemove", (member, role) => {
      database.insertData(`events`, `event_name, event_status`, `'Member Role Remove', '${member.user.tag} has lost the role ${role.name}.'`).then(res => {
        if(res.status === 200) console.log(`[Member Role Remove] ${member.user.tag} has lost the role ${role.name}`)
      })
    });
    
    client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {
      database.insertData(`events`, `event_name, event_status`, `'Member Nickname Update', '${member.user.tag} nickname is now ${newNickname}.'`).then(res => {
        if(res.status === 200) console.log(`[Member Nickname Update] ${member.user.tag} nickname is now ${newNickname}`)
      })
    });
    
    client.on("guildMemberEntered", (member) => {
      database.insertData(`events`, `event_name, event_status`, `'Member Entered', '${member.user.tag} has passed the gate'`).then(res => {
        if(res.status === 200) console.log(`[Member Entered] ${member.user.tag} has passed the gate.`)
      })
    });
    
    client.on("unhandledGuildMemberUpdate", (oldMember, newMember) => {
      database.insertData(`events`, `event_name, event_status`, `'Unhandled Guild Member Update', '${oldMember.id} was updated with unknown changes.'`).then(res => {
        if(res.status === 200) console.log(`[Unhandled Guild Member Update] ${oldMember.id} was updated with unknown changes.`)
      })
    });
    
    client.on("guildBoostLevelUp", (guild, oldLevel, newLevel) => {
      database.insertData(`events`, `event_name, event_status`, `'Guild Level Up', ' ${guild.name} reached the boost level ${newLevel}'`).then(res => {
        if(res.status === 200) console.log(`[Guild Level Up] ${guild.name} reached the boost level ${newLevel}.`)
      })
    });
    
    client.on("guildBoostLevelDown", (guild, oldLevel, newLevel) => {
      database.insertData(`events`, `event_name, event_status`, `'Guild Level Down', ' ${guild.name} returned to the boost level ${newLevel}'`).then(res => {
        if(res.status === 200) console.log(`[Guild Level Down] ${guild.name} returned to the boost level ${newLevel}.`)
      })
    });
    
    client.on("guildBannerAdd", (guild, bannerURL) => {
      database.insertData(`events`, `event_name, event_status`, `'Guild Banner Add', ' ${guild.name} has a new banner.'`).then(res => {
        if(res.status === 200) console.log(`[Guild Banner Add] ${guild.name} has a new banner.`)
      })
    });
    
    client.on("guildAfkChannelAdd", (guild, afkChannel) => {
      database.insertData(`events`, `event_name, event_status`, `'Guild AFK Channel', ' ${guild.name} has a AFK channel.'`).then(res => {
        if(res.status === 200) console.log(`[Guild AFK Channel] ${guild.name} has a AFK channel.`)
      })
    });
    
    client.on("guildVanityURLAdd", (guild, vanityURL) => {
      database.insertData(`events`, `event_name, event_status`, `'Guild Vanity URL Add', ' ${guild.name} has a vanity url ${vanityURL}.'`).then(res => {
        if(res.status === 200) console.log(`[Guild Vanity URL Add] ${guild.name} has a vanity url ${vanityURL}.`)
      })
    });
    
    client.on("guildVanityURLRemove", (guild, vanityURL) => {
      database.insertData(`events`, `event_name, event_status`, `'Guild Vanity URL Remove', ' ${guild.name} has removed its vanity url ${vanityURL}.'`).then(res => {
        if(res.status === 200) console.log(`[Guild Vanity URL Remove] ${guild.name} has removed its vanity url ${vanityURL}.`)
      })
    });
    
    client.on("guildVanityURLUpdate", (guild, oldVanityURL, newVanityURL) => {
      database.insertData(`events`, `event_name, event_status`, `'Guild Vanity URL Update', ' ${guild.name} has updated its vanity url ${newVanityURL}.'`).then(res => {
        if(res.status === 200) console.log(`[Guild Vanity URL Update] ${guild.name} has updated its vanity url ${newVanityURL}.`)
      })
    });
    
    client.on("guildFeaturesUpdate", (oldGuild, newGuild) => {
      database.insertData(`events`, `event_name, event_status`, `'Guild Features Update', 'New Features: ${newGuild.features.join(", ")}'`).then(res => {
        if(res.status === 200) console.log(`[Guild Features Update] ${newGuild.features.join(", ")}`)
      })
    });
    
    client.on("guildAcronymUpdate", (oldGuild, newGuild) => {
      database.insertData(`events`, `event_name, event_status`, `'Guild Acronym Update', '${oldGuild.name} updated its Acronym to ${newGuild.nameAcronym}'`).then(res => {
        if(res.status === 200) console.log(`[Guild Acronym Update] ${oldGuild.name} updated its Acronym to ${newGuild.nameAcronym}`)
      })
    });
    
    client.on("guildOwnerUpdate", (oldGuild, newGuild) => {
      database.insertData(`events`, `event_name, event_status`, `'Guild Owner Update', '${oldGuild.name} updated its owner to ${newGuild.owner.id}'`).then(res => {
        if(res.status === 200) console.log(`[Guild Owner Update] ${oldGuild.name} updated its owner to ${newGuild.owner.id}`)
      })
    });
    
    client.on("guildPartnerAdd", (guild) => {
      database.insertData(`events`, `event_name, event_status`, `'Guild Partner Add', '${guild.name} got partnered'`).then(res => {
        if(res.status === 200) console.log(`[Guild Partner Add] ${guild.name} got partnered`)
      })
    });
    
    client.on("guildPartnerRemove", (guild) => {
      database.insertData(`events`, `event_name, event_status`, `'Guild Partner Remove', '${guild.name} is no longer partnered'`).then(res => {
        if(res.status === 200) console.log(`[Guild Partner Remove] ${guild.name} is no longer partnered`)
      })
    });
    
    client.on("guildVerificationAdd", (guild) => {
      database.insertData(`events`, `event_name, event_status`, `'Guild Verification Add', '${guild.name} got verified'`).then(res => {
        if(res.status === 200) console.log(`[Guild Verification Add] ${guild.name} got verified`)
      })
    });
    
    client.on("guildVerificationRemove", (guild) => {
      database.insertData(`events`, `event_name, event_status`, `'Guild Verify Remove', '${guild.name} is no longer verified'`).then(res => {
        if(res.status === 200) console.log(`[Guild Verify Remove] ${guild.name} is no longer verified`)
      })
    });
    
    client.on("unhandledGuildUpdate", (oldGuild, newGuild) => {
      database.insertData(`events`, `event_name, event_status`, `'Unhandled Guild Update', '${oldGuild.id} was updated with unknown changes'`).then(res => {
        if(res.status === 200) console.log(`[Unhandled Guild Update] ${oldGuild.id} was updated with unknown changes`)
      })
    });

    client.on("messagePinned", (message) => {
      database.insertData(`events`, `event_name, event_status`, `'Message Pinned', '${message} was pinned'`).then(res => {
        if(res.status === 200) console.log(`[Message Pinned] ${message} was pinned.`)
      })
    });
    
    client.on("messageContentEdited", (message, oldContent, newContent) => {
      database.insertData(`events`, `event_name, event_status`, `'Message Edited', '${message} was edited'`).then(res => {
        if(res.status === 200) console.log(`[Message Edited] ${message} was edited.`)
      })
    });
    
    client.on("unhandledMessageUpdate", (oldMessage, newMessage) => {
      database.insertData(`events`, `event_name, event_status`, `'Unhandled Message Updated', '${oldMessage} was updated with unknown changes.'`).then(res => {
        if(res.status === 200) console.log(`[Unhandled Message Updated] ${oldMessage} was updated with unknown changes.`)
      })
    });
    
    client.on("guildMemberOffline", (member, oldStatus) => {
      database.insertData(`events`, `event_name, event_status`, `'Member Offline', '${member} became offline.'`).then(res => {
        if(res.status === 200) console.log(`[Member Offline] ${member} became offline.`)
      })
    });
    
    client.on("guildMemberOnline", (member, newStatus) => {
      database.insertData(`events`, `event_name, event_status`, `'Member Online', '${member} became online.'`).then(res => {
        if(res.status === 200) console.log(`[Member Online] ${member} became online.`)
      })
    });
    
    client.on("unhandledPresenceUpdate", (oldPresence, newPresence) => {
      database.insertData(`events`, `event_name, event_status`, `'Unhandled Presence Update', '${oldPresence.member.user.tag} status was updated with unknown changes.'`).then(res => {
        if(res.status === 200) console.log(`[Unhandled Presence Update] ${oldPresence.member.user.tag} status was updated with unknown changes.`)
      })
    });
    
    client.on("rolePositionUpdate", (role, oldPosition, newPosition) => {
      database.insertData(`events`, `event_name, event_status`, `'Role Position Update', '${role.name} is now at position ${newPosition}'`).then(res => {
        if(res.status === 200) console.log(`[Role Position Update] ${role.name} is now at position ${newPosition}`)
      })
    });
    
    client.on("rolePermissionsUpdate", (role, oldPermissions, newPermissions) => {
      database.insertData(`events`, `event_name, event_status`, `'Role Permission Update', '${role.name} has updated permissions.'`).then(res => {
        if(res.status === 200) console.log(`[Role Permission Update] ${role.name} has updated permissions.`)
      })
    });
    
    client.on("unhandledRoleUpdate", (oldRole, newRole) => {
      database.insertData(`events`, `event_name, event_status`, `'Unhandled Role Update', '${oldRole.id} was updated with unknown changes.'`).then(res => {
        if(res.status === 200) console.log(`[Unhandled Role Update] ${oldRole.id} was updated with unknown changes.`)
      })
    });
    
    client.on("threadStateUpdate", (oldThread, newThread) => {
      database.insertData(`events`, `event_name, event_status`, `'Thread State Update', '${newThread.name} is now ${newThread.archived ? "archived" : "unarchived"}.'`).then(res => {
        if(res.status === 200) console.log(`[Thread State Update] ${newThread.name} is now ${newThread.archived ? "archived" : "unarchived"}.`)
      })
    });
    
    client.on("threadNameUpdate", (thread, oldName, newName) => {
      database.insertData(`events`, `event_name, event_status`, `'Thread Name Update', '${oldName} name is updated to ${newName}.'`).then(res => {
        if(res.status === 200) console.log(`[Thread Name Update] ${oldName} name is updated to ${newName}.`)
      })
    });
    
    client.on("threadLockStateUpdate", (oldThread, newThread) => {
      database.insertData(`events`, `event_name, event_status`, `'Thread Lock State Update', '${newThread.name} is now ${newThread.locked ? "locked" : "unlocked"}.'`).then(res => {
        if(res.status === 200) console.log(`[Thread Lock State Update] ${newThread.name} is now ${newThread.locked ? "locked" : "unlocked"}.`)
      })
    });
    
    client.on("threadRateLimitPerUserUpdate", (thread, oldRateLimitPerUser, newRateLimitPerUser) => {
      database.insertData(`events`, `event_name, event_status`, `'Thread Rate Limit Update', '${thread.name} slowmode got changed from ${oldRateLimitPerUser ? oldRateLimitPerUser : 0} seconds to ${newRateLimitPerUser ? newRateLimitPerUser : 0} seconds.'`).then(res => {
        if(res.status === 200) console.log(`[Thread Rate Limit Update] ${thread.name} slowmode got changed from ${oldRateLimitPerUser ? oldRateLimitPerUser : 0} seconds to ${newRateLimitPerUser ? newRateLimitPerUser : 0} seconds.`)
      })
    });
    
    client.on("threadAutoArchiveDurationUpdate", (thread, oldAutoArchiveDuration, newAutoArchiveDuration) => {
      database.insertData(`events`, `event_name, event_status`, `'Thread Auto Archive Duration Update', '${thread.name} auto archive duration got changed from ${oldAutoArchiveDuration} minutes to ${newAutoArchiveDuration} minutes.'`).then(res => {
        if(res.status === 200) console.log(`[Thread Auto Archive Duration Update] ${thread.name} auto archive duration got changed from ${oldAutoArchiveDuration} minutes to ${newAutoArchiveDuration} minutes.`)
      })
    });
    
    client.on("unhandledThreadUpdate", (oldThread, newThread) => {
      database.insertData(`events`, `event_name, event_status`, `'Unhandled Thread Update', '${oldThread.id} was updated with unknown changes.'`).then(res => {
        if(res.status === 200) console.log(`[Unhandled Thread Update] ${oldThread.id} was updated with unknown changes.`)
      })
    });
    
    client.on("userAvatarUpdate", (user, oldAvatarURL, newAvatarURL) => {
      database.insertData(`events`, `event_name, event_status`, `'Avatar Update', '${user.tag} avatar updated.'`).then(res => {
        if(res.status === 200) console.log(`[Avatar Update] ${user.tag} avatar updated.`)
      })
    });
    
    client.on("userUsernameUpdate", (user, oldUsername, newUsername) => {
      database.insertData(`events`, `event_name, event_status`, `'Username Update', '${user.tag} username updated.'`).then(res => {
        if(res.status === 200) console.log(`[Username Update] ${user.tag} username updated.`)
      })
    });
    
    client.on("userDiscriminatorUpdate", (user, oldDiscriminator, newDiscriminator) => {
      database.insertData(`events`, `event_name, event_status`, `'Discriminator Update', '${user.tag} Discriminator updated.'`).then(res => {
        if(res.status === 200) console.log(`[Discriminator Update] ${user.tag} Discriminator updated.`)
      })
    });
    
    client.on("userFlagsUpdate", (user, oldFlags, newFlags) => {
      database.insertData(`events`, `event_name, event_status`, `'Flags Update', '${user.tag} Flags updated.'`).then(res => {
        if(res.status === 200) console.log(`[Flags Update] ${user.tag} Flags updated.`)
      })
    });
    
    client.on("unhandledUserUpdate", (oldUser, newUser) => {
      database.insertData(`events`, `event_name, event_status`, `'Unhandled User Update', '${oldUser.id} was updated with unknown changes.'`).then(res => {
        if(res.status === 200) console.log(`[Unhandled User Update] ${oldUser.id} was updated with unknown changes.`)
      })
    });
    
    client.on("voiceChannelJoin", (member, channel) => {
      database.insertData(`events`, `event_name, event_status`, `'Voice Channel Join', '${member.user.tag} joined ${channel.name}.'`).then(res => {
        if(res.status === 200) console.log(`[Voice Channel Join] ${member.user.tag} joined ${channel.name}.`)
      })
    });
    
    client.on("voiceChannelLeave", (member, channel) => {
      database.insertData(`events`, `event_name, event_status`, `'Voice Channel Leave', '${member.user.tag} left ${channel.name}.'`).then(res => {
        if(res.status === 200) console.log(`[Voice Channel Leave] ${member.user.tag} left ${channel.name}.`)
      })
    });
    
    client.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {
      database.insertData(`events`, `event_name, event_status`, `'Voice Channel Swtich', '${member.user.tag} moved to ${newChannel.name}.'`).then(res => {
        if(res.status === 200) console.log(`[Voice Channel Switch] ${member.user.tag} moved to ${newChannel.name}.`)
      })
    });
    
    client.on("voiceChannelMute", (member, muteType) => {
      database.insertData(`events`, `event_name, event_status`, `'Voice Channel Mute', '${member.user.tag} muted.'`).then(res => {
        if(res.status === 200) console.log(`[Voice Channel Mute] ${member.user.tag} muted.`)
      })
    });
    
    client.on("voiceChannelUnmute", (member, oldMuteType) => {
      database.insertData(`events`, `event_name, event_status`, `'Voice Channel Unute', '${member.user.tag} unmuted.'`).then(res => {
        if(res.status === 200) console.log(`[Voice Channel Unmute] ${member.user.tag} unmuted.`)
      })
    });
    
    client.on("voiceChannelDeaf", (member, deafType) => {
      database.insertData(`events`, `event_name, event_status`, `'Voice Channel Deafed', '${member.user.tag} deafed.'`).then(res => {
        if(res.status === 200) console.log(`[Voice Channel Deafed] ${member.user.tag} deafed.`)
      })
    });
    
    client.on("voiceChannelUndeaf", (member, deafType) => {
      database.insertData(`events`, `event_name, event_status`, `'Voice Channel Undeafed', '${member.user.tag} undeafed.'`).then(res => {
        if(res.status === 200) console.log(`[Voice Channel Undeafed] ${member.user.tag} undeafed.`)
      })
    });
    
    client.on("voiceStreamingStart", (member, voiceChannel) => {
      database.insertData(`events`, `event_name, event_status`, `'Streaming Start', '${member.user.tag} started streaming in ${voiceChannel.name}.'`).then(res => {
        if(res.status === 200) console.log(`[Streaming Start] ${member.user.tag} started streaming in ${voiceChannel.name}.`)
      })
    });
    
    client.on("voiceStreamingStop", (member, voiceChannel) => {
      database.insertData(`events`, `event_name, event_status`, `'Streaming Stop', '${member.user.tag} stopped streaming.'`).then(res => {
        if(res.status === 200) console.log(`[Streaming Stop] ${member.user.tag} stopped streaming.`)
      })
    });
    
    client.on("unhandledVoiceStateUpdate", (oldState, newState) => {
      database.insertData(`events`, `event_name, event_status`, `'Unhandled Voice State Update', '${oldState.member.user.tag} was updated with unknown changes.'`).then(res => {
        if(res.status === 200) console.log(`[Unhandled Voice State Update] ${oldState.member.user.tag} was updated with unknown changes..`)
      })
    });    
  } catch {}
}

module.exports = { handleAllEvents }