const { handleGuildMemberUpdateEvent } = require('./guildMemberUpdate')
const { handleGuildUpdateEvent }       = require('./guildUpdate')
const { handlePresenceUpdateEvent }    = require('./presenceUpdate')
const { handleRoleUpdateEvent }        = require('./roleUpdate')
const { handleUserUpdateEvent }        = require('./userUpdate') 
const { handleVoiceStateUpdateEvent }  = require('./voiceStateUpdate')
const { handleMessageUpdateEvent }     = require('./messageUpdate')
const { handleChannelUpdateEvent }     = require('./guildChannel')
const { handleThreadUpdateEvent }      = require('./threadUpdate')
const { handleAllEvents }              = require('./allEvents')

module.exports = { 
  handleGuildMemberUpdateEvent,
  handleGuildUpdateEvent,
  handlePresenceUpdateEvent,
  handleRoleUpdateEvent,
  handleUserUpdateEvent,
  handleVoiceStateUpdateEvent,
  handleMessageUpdateEvent,
  handleChannelUpdateEvent,
  handleThreadUpdateEvent,
  handleAllEvents
}