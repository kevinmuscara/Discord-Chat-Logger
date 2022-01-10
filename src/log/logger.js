eventRegisterLog = (eventName, error) => {
  try {
    if(!error) console.log(`[${Date.now()}] (EVENT REGISTER) '${eventName}' event handler registered.`)

    console.log(`[${Date.now()}] ERROR REGISTERING EVENT '${eventName}': ${error}`)
  } catch {}
}

module.exports = { eventRegisterLog }