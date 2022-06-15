import CommandHandler from './commands/CommandHandler'

import { Client } from 'discord.js'
import src from '../utils/src'
import Logger from '../utils/Logger'

class MiduClient extends Client {
  commandHandler: CommandHandler
  src: typeof src
  logger: Logger
  constructor () {
    super({
      intents: [Number(process.env.DISCORD_INTENTS)]
    })
    this.once('ready', () => {
      console.log('🥳 Bot is ready!')
    })
    this.commandHandler = new CommandHandler(this)
    this.src = src
    this.logger = new Logger('MiduDev')
    this.start()
  }

  async start () {
    try {
      this.commandHandler.loadAll()
      this.logger.info('Trying to connect to Discord')
      await this.login()
    } catch (error: any) {
      this.logger.error(typeof error === 'string' ? error : error?.message)
      process.exit(1)
    }
  }
}

export default MiduClient
