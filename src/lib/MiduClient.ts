import CommandHandler from './commands/CommandHandler'

import { Client } from 'discord.js'
import src from '../utils/src'

class MiduClient extends Client {
  commandHandler: CommandHandler
  src: typeof src
  constructor () {
    super({
      intents: [Number(process.env.DISCORD_INTENTS)]
    })
    this.once('ready', () => {
      console.log('🥳 Bot is ready!')
    })
    this.commandHandler = new CommandHandler(this)
    this.src = src
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
