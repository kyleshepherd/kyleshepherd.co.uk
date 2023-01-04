import { SECRET_DISCORD_BOT_TOKEN } from "$env/static/private";
import { Client, GatewayIntentBits } from "discord.js";
import { error } from "@sveltejs/kit";
import { getProjects } from "../../sanity";

export const load = async () => {
  let guildCount = 0;

  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  await client.login(SECRET_DISCORD_BOT_TOKEN);

  guildCount = client.guilds.cache.size;
  client.destroy();

  const projects = await getProjects();

  if (projects) {
    return {
      projects,
      guildCount,
    };
  }

  throw error(500, "internal server error");
};
