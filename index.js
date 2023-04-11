require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const Client = require("./client/Client");

const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const clientId = "968623822037205032"; // 올스타
const guildId = "937590271930163200"; // 올스타
const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: client.commands,
    });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  if (
    !interaction.member.roles.cache.hasAny(
      "940660542975139841",
      "942487222832226364"
    )
  ) {
    return interaction.reply({
      content:
        "게스트 유저는 봇 이용이 불가능 합니다. 커뮤 등업 부탁드립니다 :)",
      ephemeral: true,
    });
  }

  try {
    await command.execute(interaction, client);
    interaction.reply({
      content: `${interaction.commandName}`,
      ephemeral: true,
    });
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(process.env.BOT_TOKEN);
