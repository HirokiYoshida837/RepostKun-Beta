import "reflect-metadata";

import type {ArgsOf} from "discordx";
import {AttachmentBuilder, EmbedBuilder} from "discord.js";
import {Discord, Guard, On,} from "discordx";
import {NotBot} from "@discordx/utilities";

import {injectable} from "tsyringe";
import {ConfigService} from "../../config/config-service";
import {getInfoFromUrl, getOnlyUrlText, isTwitterUrl} from "./const";


@Discord()
@injectable()
export class TweetExtractController {

  constructor(
    private readonly _configService: ConfigService
  ) {
  }

  @On({event: "messageCreate"})
  @Guard(NotBot)
  async repostToYoutubeCh([message]: ArgsOf<"messageCreate">) {

    // TODO : refactor
    try {
      if (!isTwitterUrl(message.content)) {
        return
      }

      const twUrl = getOnlyUrlText(message.content)
      const twInfo = getInfoFromUrl(twUrl);
      const withOutAtMark = twInfo.userId?.replace('@','')

      const url = `${this._configService.config.TW_EXTRACT_URL}/api/internal/extract/${withOutAtMark??""}/${twInfo.statusId??""}`
      const res = await fetch(url, {
        method: "get"
      })

      const obj = await res.json()
      console.log(obj.data.extracted.account)

      const imgBuf = Buffer.from(obj.data.extracted.imageBase64, 'base64');
      const fileName = obj.data.extracted.fileName

      const file = new AttachmentBuilder(imgBuf, { name: fileName });

      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF) // 横部分のバーの色
        .setTitle(twInfo.userId??"")
        .setURL(twUrl)
        .setImage(`attachment://${fileName}`)
        .setTimestamp()
      await message.channel.send({ embeds: [exampleEmbed], files: [file] })

    } catch (e) {
      console.error(e)
    }
  }
}
