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
  category: string

  constructor (id: string, { aliases = [], description = '', usage = '', onlyOwner = false, category = 'default' }: CommandData) {
    super(id, {
      category
    })
    this.aliases = aliases
    this.description = description
    this.usage = usage
    this.onlyOwner = onlyOwner
    this.category = category
  }

  abstract run (message: Message, args: string[]): void
}
export default Command
