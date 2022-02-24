const Discord = require("discord.js");
const client = new Discord.Client({intents:["GUILDS", "GUILD_MEMBERS"]});
const token = require("./token.json")

const fs = require("fs");
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.key, command);
}

client.levels = [50,125,200,300,500,750,1000,1500,2000,3500,5000,7500,10000,15000,20000,30000,50000,75000,
    100000,200000,300000,400000,500000,600000,700000,800000,900000,1000000,1100000,1200000];

const Datasource = require('nedb');
const db = new Datasource({filename: './database', autoload: true});

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
        try {
            await client.commands.get(interaction.commandName).execute({interaction: interaction, client: client, database: db, Discord: Discord});
        } catch (err) { console.log(err); }
    }
});

client.login(token);
