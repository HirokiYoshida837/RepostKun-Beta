import "reflect-metadata";

import {DIService, tsyringeDependencyRegistryEngine} from "discordx";
import {container} from "tsyringe";
import {Bot} from "./bot";

// initialize TSyringe container
DIService.engine = tsyringeDependencyRegistryEngine.setInjector(container);
const bot = container.resolve(Bot);

bot.bootstrap();
