import "reflect-metadata";

import type {ArgsOf} from "discordx";
import {Discord, Guard, On,} from "discordx";
import {NotBot} from "@discordx/utilities";

import {injectable} from "tsyringe";

import {CheckContentContainsTargetWord} from "./libs/const";
import {ChannelType} from "discord.js";
import {ConfigService} from "../../config/config-service";



/**
 * youtubeなどの動画リンクを含む投稿を"youtube" から始まるチャンネルに再投稿します。
 * また、同時に元投稿のembedの削除と、リポストマーカーの付与を行います。
 */
@Discord()
@injectable()
export class YoutubeRepostController {

  constructor(
    private readonly _configService: ConfigService
  ) {
  }

  @On({event: "messageCreate"})
  @Guard(NotBot)
  async repostToYoutubeCh([message]: ArgsOf<"messageCreate">) {

    try {

      if (!CheckContentContainsTargetWord(message.content)){
        return
      }

      const ch = message.guild?.channels.cache
        ?.filter(x => x.type == ChannelType.GuildText)
        .filter(x => x.isTextBased())
        .filter(x => x.name.toLowerCase().startsWith("youtube"))
        .first()

      if (!ch){
        return
      }

      if (ch.id == message.channelId){
        return
      }

      await message.suppressEmbeds(true)

      if (ch?.isTextBased()) {
        await ch.send(`${message.content} [repost from ${message.author.username}'s post]`)
      }

      await message.react(`📫`)

    } catch (e) {
      console.error(e)
    }
  }
}
