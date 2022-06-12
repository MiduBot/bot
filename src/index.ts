import 'dotenv/config'
import MiduBot from './lib/Client'

const client = new MiduBot()

client.once('ready', () => {
  console.log('🥳 Bot is ready!')
})

client.login(process.env.DISCORD_TOKEN)
