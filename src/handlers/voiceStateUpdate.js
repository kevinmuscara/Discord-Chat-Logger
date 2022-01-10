handleVoiceStateUpdateEvent = async(client, oldState, newState) => {
  try {
    let emitted = false;
    const oldMember = oldState.member;
    const newMember = newState.member;

    if (!oldState.channel && newState.channel) {
        client.emit('voiceChannelJoin', newMember, newState.channel);
        emitted = true;
    }

    if (oldState.channel && !newState.channel) {
        client.emit('voiceChannelLeave', newMember, oldState.channel);
        emitted = true;
    }

    if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
        client.emit('voiceChannelSwitch', newMember, oldState.channel, newState.channel);
        emitted = true;
    }

    if (!oldState.mute && newState.mute) {
        const muteType = newState.selfMute ? 'self-muted' : 'server-muted';
        client.emit('voiceChannelMute', newMember, muteType);
        emitted = true;
    }

    if (oldState.mute && !newState.mute) {
        const muteType = oldState.selfMute ? 'self-muted' : 'server-muted';
        client.emit('voiceChannelUnmute', newMember, muteType);
        emitted = true;
    }

    if (!oldState.deaf && newState.deaf) {
        const deafType = newState.selfDeaf ? 'self-deafed' : 'server-v';
        client.emit('voiceChannelDeaf', newMember, deafType);
        emitted = true;
    }

    if (oldState.deaf && !newState.deaf) {
        const deafType = oldState.selfDeaf ? 'self-deafed' : 'server-v';
        client.emit('voiceChannelUndeaf', newMember, deafType);
        emitted = true;
    }

    if (!oldState.streaming && newState.streaming) {
        client.emit('voiceStreamingStart', newMember, newState.channel);
        emitted = true;
    }

    if (oldState.streaming && !newState.streaming) {
        client.emit('voiceStreamingStop', newMember, newState.channel);
        emitted = true;
    }

    if (!emitted) {
        client.emit('unhandledVoiceStateUpdate', oldState, newState);
    }
  } catch {}
}

module.exports = { handleVoiceStateUpdateEvent }