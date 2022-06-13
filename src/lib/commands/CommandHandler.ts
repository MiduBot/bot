import { Collection } from 'discord.js'
import src from '../../utils/src'
import BaseHandler from '../BaseHandler'
import MiduBot from '../MiduClient'
import Command from './Command'

class CommandHandler extends BaseHandler {
  client: MiduBot
  modules: Collection<string, Command>
  constructor (client: MiduBot) {
    super(client, {
      path: src('modules', 'commands')
    })
    this.client = client
    this.modules = new Collection()
  }
}

export default CommandHandler
