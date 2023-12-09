import {dirname, importx} from "@discordx/importer";
import type {Interaction, Message} from "discord.js";
import {GatewayIntentBits} from "discord.js";
import {Client} from "discordx";
import * as dotenv from 'dotenv'

dotenv.config()

async function start() {


  const bot = new Client({

    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],

    // Debug logs are disabled in silent mode
    silent: false,

    // Configuration for @SimpleCommand
    simpleCommand: {
      prefix: "!",
    },
  });


  bot.once("ready", async () => {
    // Make sure all guilds are cached
    // await bot.guilds.fetch();

    // Synchronize applications commands with Discord
    await bot.initApplicationCommands();

    console.log("Bot started");
  });

  bot.on("interactionCreate", (interaction: Interaction) => {
    bot.executeInteraction(interaction);
  });

  bot.on("messageCreate", async (message: Message) => {
    await bot.executeCommand(message);
  });

  async function run() {

    // The following syntax should be used in the ECMAScript environment
    await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);
    // await importx(`${dirname(import.meta.url)}/{events}/**/*.{ts,js}`);

    // Let's start the bot
    if (!process.env.BOT_TOKEN) {
      throw Error("Could not find BOT_TOKEN in your environment");
    }

    // Log in with your bot token
    await bot.login(process.env.BOT_TOKEN);
  }

  run().catch((err) => {
    throw err;
  });

}

start();




