import {singleton} from "tsyringe";

import {Service} from "./service";
import {Config} from "./config";

import {config} from "dotenv";


@singleton()
export class ConfigService implements Service {
  private readonly _config: Config;

  constructor() {
    config();
    this._config = ConfigService.parseConfig()
  }

  public init(): Promise<void> {
    return Promise.resolve();
  }

  public get config(): Config {
    return this._config;
  }

  private static parseConfig() : Config{
    const conf: Config = {
      BOT_TOKEN: process.env.BOT_TOKEN ?? "",
      TW_EXTRACT_URL: process.env.TW_EXTRACT_URL ?? "http://localhost:30030"
    }
    return conf
  }

}
