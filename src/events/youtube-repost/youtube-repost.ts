import type {ArgsOf} from "discordx";
import {Discord,Guard, On} from "discordx";
import {NotBot} from "@discordx/utilities";
import {CheckContentContainsTargetWord} from "./libs/const.js";

@Discord()
class YoutubeRepost {

  @On({event: "messageCreate"})
  @Guard(NotBot)
  async onMessage([message]: ArgsOf<"messageCreate">) {

    if (CheckContentContainsTargetWord(message.content)) {
      await message.reply("YouTubeのリンクやんけ！");
    }
  }
}

