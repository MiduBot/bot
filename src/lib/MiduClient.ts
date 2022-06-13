import CommandHandler from './commands/CommandHandler'

import { Client } from 'discord.js'

class MiduClient extends Client {
  commandHandler: CommandHandler
  constructor () {
    super({
      intents: [Number(process.env.DISCORD_INTENTS)]
    })
    this.once('ready', () => {
      console.log('🥳 Bot is ready!')
    })
    this.commandHandler = new CommandHandler(this)
    this.start()
  }

  async start () {
    try {
      this.commandHandler.loadAll()
      await this.login()
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }
}

export default MiduClient
