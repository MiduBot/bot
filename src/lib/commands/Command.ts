import { Message } from 'discord.js'
import BaseModule from '../BaseModule'
interface CommandData {
  aliases: string[]
  description?: string
  usage?: string
  onlyOwner?: boolean
  __filepath?: string
  category?: string
}
abstract class Command extends BaseModule {
  aliases: string[]
  description: string
  usage: string
  onlyOwner: boolean
  __filepath: string
  category: string

  constructor (id: string, { aliases, description, usage, onlyOwner, category }: CommandData) {
    super(id, {
      category
    })
    this.aliases = []
    this.description = ''
    this.usage = ''
    this.onlyOwner = false

    this.__filepath = ''
    this.category = ''
  }

  abstract run (message: Message, args: string[]): void
}
export default Command
