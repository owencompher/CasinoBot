const Discord = require("discord.js");
const client = new Discord.Client({intents:[Discord.Intents.FLAGS.GUILDS]});
const token = require("./token.json")

const fs = require("fs");
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.key, command);
}

client.on("ready",()=>{
    console.log("CasinoBot Online!");
})

client.on('guildMemberAdd', member => {
    db.findOne({_id: member.user.id}, (err, user) => {
        if (user) {
            console.log(member.user.id + ' was already on the database');
        } else {
            db.insert({_id: member.user.id, bal: 1000}, ()=>{});
            console.log(member.user.id + ' was added to the database');
        }
    })
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (client.commands.has(interaction.commandName)) {
        await client.commands.get(interaction.commandName).execute({interaction: interaction, client: client, database: db});
    }
});

client.login(token);
