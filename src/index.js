const { Intents } = require('discord.js')
const { eventRegisterLog } = require('./log/logger')

const {
  handleChannelUpdateEvent,
  handleGuildUpdateEvent,
  handleRoleUpdateEvent,
  handleThreadUpdateEvent,
  handleGuildMemberUpdateEvent,
  handleUserUpdateEvent,
  handleMessageUpdateEvent,
  handlePresenceUpdateEvent,
  handleVoiceStateUpdateEvent,
  handleAllEvents
} = require('./handlers')

const database = require('./db')

let DEFAULT_LOGGER_OPTIONS = { 
  debug: false,
  db: {
    host: '127.0.0.1',
    port: 5520,
    user: 'postgres',
    password: 'postgres'
  }
}

Logger = async(client, options) => {
  console.assert(client, `Client parameter is required.`)
  if(!options) options = DEFAULT_LOGGER_OPTIONS

  const intents = new Intents(client.options.intents)

  database.connect(options.db).then(() => console.log('Database connected'));

  // Create Guilds Table
  database.doesTableExist('guilds').then(res => {
    if(res) {
      if(options.debug) console.log(`GUILDS Database table exists.`)
    } else {
      if(options.debug) console.log(`GUILDS Database table doesn't exist, creating now...`)
      database.createTable('guilds', `guild_name text NOT NULL, guild_id text NOT NULL, verified text NOT NULL, partnered text NOT NULL`).then(createRes => {
        if(createRes.status === 200) {
          if(options.debug) console.log(`Successfully created GUILDS Database table.`)
        } else {
          if(options.debug) console.log(`Failed to create GUILDS Database table.`)
        }
      })
    }
  })

  // Create Messages Table
  database.doesTableExist('messages').then(res => {
    if(res) {
      if(options.debug) console.log(`MESSAGES Database table exists.`)
    } else {
      if(options.debug) console.log(`MESSAGES Database table doesn't exist, creating now...`)
      database.createTable('messages', `guild_id text NOT NULL, channel_id text NOT NULL, channel_name text NOT NULL, message_id text NOT NULL, message_author text NOT NULL, message_content text NOT NULL`).then(createRes => {
        if(createRes.status === 200) {
          if(options.debug) console.log(`Successfully created MESSAGES Database table`)
        } else {
          if(options.debug) console.log(`Failed to create MESSAGES Database table.`)
        }
      })
    }
  })

  // Create Events Table
  database.doesTableExist('events').then(res => {
    if(res) {
      if(options.debug) console.log(`EVENTS Database table exists.`)
    } else {
      if(options.debug) console.log(`EVENTS Database table doesn't exist, creating now...`)
      database.createTable('events', `event_name text NOT NULL, event_status text NOT NULL`).then(createRes => {
        if(createRes.status === 200) {
          if(options.debug) console.log(`Successfully created EVENTS Database table`)
        } else {
          if(options.debug) console.log(`Failed to create EVENTS Database table.`)
        }
      })
    }
  })

  // GUILD EVENTS
  if(intents.has('GUILDS')) {
    if(options.debug) eventRegisterLog(`channelUpdate`)
    client.on('channelUpdate', (oldChannel, newChannel) => handleChannelUpdateEvent(client, oldChannel, newChannel))

    if(options.debug) eventRegisterLog(`guildUpdate`)
    client.on('guildUpdate', (oldGuild, newGuild) => handleGuildUpdateEvent(client, oldGuild, newGuild))

    if(options.debug) eventRegisterLog(`roleUpdate`)
    client.on('roleUpdate', (oldRole, newRole) => handleRoleUpdateEvent(client, oldRole, newRole))

    if(options.debug) eventRegisterLog(`threadUpdate`)
    client.on('threadUpdate', (oldThread, newThread) => handleThreadUpdateEvent(client, oldThread, newThread))
  } else {
    if(options.debug) eventRegisterLog(`channelUpdate, guildUpdate, roleUpdate, threadUpdate`, `event handlers not registered due to missing GUILDS intent.`);
  }

  // MEMBER EVENTS
  if(intents.has('GUILD_MEMBERS')) {
    if(options.debug) eventRegisterLog('guildMemberUpdate')
    client.on('guildMemberUpdate', (oldMember, newMember) => handleGuildMemberUpdateEvent(client, oldMember, newMember))

    if(options.debug) eventRegisterLog('userUpdate')
    client.on('userUpdate', (oldUser, newUser) => handleUserUpdateEvent(client, oldUser, newUser))
  } else {
    if(options.debug) eventRegisterLog(`guildMemberUpdate, userUpdate`, 'event handlers not registered due to missing GUILD_MEMBERS intent.')
  }

  // MESSAGE EVENTS
  if(intents.has('GUILD_MESSAGES')) {
    if(options.debug) eventRegisterLog(`messageUpdate`)
    client.on('messageUpdate', (oldMessage, newMessage) => handleMessageUpdateEvent(client, oldMessage, newMessage))
  } else {
    if(options.debug) eventRegisterLog(`messageUpdate`, 'event handler not registered due to missing GUILD_MESSAGES intent.')
  }

  // PRESENCE EVENTS
  if(intents.has('GUILD_PRESENCES')) {
    if(options.debug) eventRegisterLog('presenceUpdate')
    client.on('presenceUpdate', (oldPresence, newPresence) => handlePresenceUpdateEvent(client, oldPresence, newPresence))
  } else {
    if(options.debug) eventRegisterLog(`presenceUpdate`, 'event handler not registered due to missing GUILD_PRESENCES intent.')
  }

  // VOICE STATE EVENTS
  if(intents.has('GUILD_VOICE_STATES')) {
    if(options.debug) eventRegisterLog('voiceStateUpdate')
    client.on('voiceStateUpdate', (oldState, newState) => handleVoiceStateUpdateEvent(client, oldState, newState))
  } else {
    if(options.debug) eventRegisterLog('voiceStateUpdate', 'event handler not registered due to missing GUILD_VOICE_STATES intent.')
  }

}

getGuilds = async()   => { return new Promise(async(resolve, reject) => database.findData('guilds').then(res => resolve(res.rows)))}
getMessages = async() => { return new Promise(async(resolve, reject) => database.findData('messages').then(res => resolve(res.rows)))}
getEvents = async()   => { return new Promise(async(resolve, reject) => database.findData('events').then(res => resolve(res.rows)))}

module.exports = {Logger, database}