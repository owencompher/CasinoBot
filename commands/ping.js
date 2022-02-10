module.exports = {
    key: "ping",
    execute(arg) {
        arg.interaction.reply("pong");
        console.log(arg.interaction);
    }
}
