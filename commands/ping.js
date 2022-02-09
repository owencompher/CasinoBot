module.exports = {
    key: "ping",
    execute(interaction) {
        interaction.reply("pong");
        console.log(interaction);
    }
}
