const { Client } = require('discord.js')

class MiduBot extends Client {
  constructor () {
    super({
      intents: [Number(process.env.DISCORD_INTENTS)]
    })
  }
}

export default MiduBot
