import "reflect-metadata";

import type {ArgsOf} from "discordx";
import {Discord, Guard, On,} from "discordx";
import {NotBot} from "@discordx/utilities";
import {CheckContentContainsTargetWord} from "./youtube-repost/libs/const";
import {injectable} from "tsyringe";
import {ConfigService} from "../config/config-service";

@Discord()
@injectable()
class Hello {

  constructor(
    private readonly _configService: ConfigService
  ) {
  }

  @On({event: "messageCreate"})
  @Guard(NotBot)
  async onMessage([message]: ArgsOf<"messageCreate">) {

    try {

      if (CheckContentContainsTargetWord(message.content)) {
        await message.reply("YouTubeのリンクやんけ！");
      }

    }catch (e){
      console.error(e)
      throw e
    }


  }
}


// @singleton()
// export class Database {
//   database: string;
//
//   constructor() {
//     console.log("I am database");
//     this.database = "connected";
//   }
//
//   query() {
//     return this.database;
//   }
// }

// コンテナにクラスを登録
// container.register('Database', {
//   useClass: Database,
// })


// constructor(@inject('Database') private _database: Database) {
//   console.log("constructed me as a singleton and injected _database");
// }
