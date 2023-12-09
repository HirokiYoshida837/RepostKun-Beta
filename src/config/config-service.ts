import {singleton} from "tsyringe";

import {Service} from "./service";
import {Config} from "./config";


@singleton()
export class ConfigService implements Service {
  private readonly _config: Config;

  constructor() {
    this._config = {
      name: "this is name!"
    }
  }

  public init(): Promise<void> {
    return Promise.resolve();
  }

  public get config(): Config {
    return this._config;
  }
}
