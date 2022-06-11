import 'dotenv/config'
import Discord from 'discord.js'

const client = new Discord.Client({
  intents: [Number(process.env.DISCORD_INTENTS)]
})

client.login()
