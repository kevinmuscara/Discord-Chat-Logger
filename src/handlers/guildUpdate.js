handleGuildUpdateEvent = async(client, oldGuild, newGuild) => {
  try {
    let emitted = false;

    if (oldGuild.premiumTier < newGuild.premiumTier) {
      client.emit('guildBoostLevelUp', newGuild, oldGuild.premiumTier, newGuild.premiumTier);
      emitted = true;
    }

    if (oldGuild.premiumTier > newGuild.premiumTier) {
      client.emit('guildBoostLevelDown', oldGuild, newGuild);
      emitted = true;
    }
  
    if (!oldGuild.banner && newGuild.banner) {
      client.emit('guildBannerAdd', newGuild, newGuild.bannerURL());
      emitted = true;
    }

    if (!oldGuild.afkChannel && newGuild.afkChannel) {
      client.emit('guildAfkChannelAdd', newGuild, newGuild.afkChannel);
      emitted = true;
    }

    if (!oldGuild.vanityURLCode && newGuild.vanityURLCode) {
      client.emit('guildVanityURLAdd', newGuild, newGuild.vanityURLCode);
      emitted = true;
    }

    if (oldGuild.vanityURLCode && !newGuild.vanityURLCode) {
      client.emit('guildVanityURLRemove', newGuild, oldGuild.vanityURLCode);
      emitted = true;
    }

    if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
      client.emit('guildVanityURLUpdate', newGuild, oldGuild.vanityURLCode, newGuild.vanityURLCode);
      emitted = true;
    }

    if (oldGuild.features.length !== newGuild.features.length) {
      client.emit('guildFeaturesUpdate', oldGuild, newGuild);
      emitted = true;
    }

    if (oldGuild.nameAcronym !== newGuild.nameAcronym) {
      client.emit('guildAcronymUpdate', oldGuild, newGuild);
      emitted = true;
    }

    if (oldGuild.ownerId !== newGuild.ownerId) {
      client.emit('guildOwnerUpdate', oldGuild, newGuild);
      emitted = true;
    }

    if (!oldGuild.partnered && newGuild.partnered) {
      client.emit('guildPartnerAdd', newGuild);
      emitted = true;
    }

    if (oldGuild.partnered && !newGuild.partnered) {
      client.emit('guildPartnerRemove', newGuild);
      emitted = true;
    }

    if (!oldGuild.verified && newGuild.verified) {
      client.emit('guildVerificationAdd', newGuild);
      emitted = true;
    }

    if (oldGuild.verified && !newGuild.verified) {
      client.emit('guildVerificationRemove', newGuild);
      emitted = true;
    }

    if (!emitted) {
      client.emit('unhandledGuildUpdate', oldGuild, newGuild);
    }
  } catch {}
}

module.exports = { handleGuildUpdateEvent }