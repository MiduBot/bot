import { Message } from 'discord.js'
import Command from '../../../lib/commands/Command'

class TestCommand extends Command {
  constructor () {
    super('test', {
      aliases: ['test']
    })
  }

  async run (message: Message, args: string[]) {
    message.channel.send('Test command ran!')
  }
}

export default TestCommand
