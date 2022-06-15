import 'dotenv/config'
import MiduClient from './lib/MiduClient'

// eslint-disable-next-line no-unused-vars
const client = new MiduClient()

client.on('messageCreate', async (message) => {
  if (message.author.bot) return
  const prefix = `${process.env.DISCORD_PREFIX}`
  if (!message.content.startsWith(prefix)) return
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const commandName = args?.shift()?.toLowerCase()
  const command = client.commandHandler.modules.find(m => m.aliases.includes(`${commandName}`))
  if (!command) return

  try {
    command.client = client
    command.handler = client.commandHandler
    command.run(message, args)
  } catch (error) {
    console.error(error)
  }
})
