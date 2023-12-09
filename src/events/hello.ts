import type {ArgsOf} from "discordx";
import {Discord,Guard, On} from "discordx";
import {NotBot} from "@discordx/utilities";
// import {CheckContentContainsTargetWord} from "./youtube-repost/libs/const.js";

@Discord()
class Hello {

  @On({event: "messageCreate"})
  @Guard(NotBot)
  async onMessage([message]: ArgsOf<"messageCreate">) {

    console.log(`hello, ${message.content}`)

    // if (CheckContentContainsTargetWord(message.content)) {
    //   await message.reply("YouTubeのリンクやんけ！");
    // }
  }
}

