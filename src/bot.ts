import "reflect-metadata";

import {dirname, importx} from "@discordx/importer";
import type {Interaction, Message} from "discord.js";
import {GatewayIntentBits} from "discord.js";
import {Client, DIService, tsyringeDependencyRegistryEngine} from "discordx";

import * as dotenv from 'dotenv'
import { ConfigService } from "./config/config-service";
import {container, injectable} from "tsyringe";
import { Service } from "./config/service";

dotenv.config()

@injectable()
export class Bot {
  private readonly _client: Client;
  private readonly _services: Service[];

  constructor(
    private _configService: ConfigService,
  ) {

    this._services = [
      this._configService
    ]


    this._client = new Client({
      // Discord intents
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
  }

  async bootstrap() {
    this._client.once("ready", async () => {
      // Make sure all guilds are cached
      // await bot.guilds.fetch();

      await this._client.initApplicationCommands();

      console.log("Bot started");
    });

    this._client.on("interactionCreate", (interaction: Interaction) => {
      this._client.executeInteraction(interaction);
    });

    this._client.on("messageCreate", async (message: Message) => {
      await this._client.executeCommand(message);
    });

    // The following syntax should be used in the ECMAScript environment
    await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);

    if (!process.env.BOT_TOKEN) {
      throw Error("Could not find BOT_TOKEN in your environment");
    }

    await this._client.login(process.env.BOT_TOKEN);
  }

  public get client(): Client {
    return this._client;
  }

}

// initialize TSyringe container
DIService.engine = tsyringeDependencyRegistryEngine.setInjector(container);
const bot = container.resolve(Bot);
bot.bootstrap();