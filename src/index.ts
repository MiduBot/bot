import "dotenv/config";
import Discord from "discord.js";

const client = new Discord.Client({
  intents: [Number(process.env.DISCORD_INTENTS)],
});

client.once("ready", () => {
  console.log("🥳 Bot is ready!");
});

client.login(process.env.DISCORD_TOKEN);
