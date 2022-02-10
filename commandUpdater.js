const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = require('./token.json');
const fs = require('fs');

const commands = JSON.parse(fs.readFileSync('commands.json', 'utf-8'));

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started request to API');

    commands.forEach(command => {
      rest.post(
        Routes.applicationGuildCommands('941057297256415262', '941067146132340846'),
        { body: command },
      );
    });

    await rest.get(Routes.applicationGuildCommands('941057297256415262', '941067146132340846')).then((commands) => {
      console.log(commands);
    });

    console.log('Successfully sent request to API');
  } catch (error) {
    console.error(error);
  }
})();
