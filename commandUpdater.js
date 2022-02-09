const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = require('./token.json');

const commands = []; 

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands('941057297256415262', '941067146132340846'),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
