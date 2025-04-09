// main.ts
import { Client } from "https://deno.land/x/harmony@v2.9.1/mod.ts";

// 環境変数からトークンとユーザーIDを取得
const TOKEN = Deno.env.get("DISCORD_TOKEN")!;
const MY_ID = Deno.env.get("MY_USER_ID")!;
const TARGET_ID = Deno.env.get("TARGET_USER_ID")!;

const bot = new Client();

bot.on("ready", () => {
  console.log(`✅ Bot起動完了：${bot.user?.tag}`);
});

bot.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.author.id === MY_ID) {
    await message.channel.send(`${message.content} <@${TARGET_ID}>`);
  } else if (message.author.id === TARGET_ID) {
    await message.channel.send(`${message.content} <@${MY_ID}>`);
  }
});

await bot.connect(TOKEN, ["Guilds", "GuildMessages", "MessageContent"]);