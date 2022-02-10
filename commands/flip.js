module.exports = {
    key: "flip",
    execute(interaction) {
        const channel = interaction.channel
        const name = interaction.member.displayName;
        const bet = interaction.options.get('bet').value;
        const side = (Math.random() > 0.5 ? "heads" : "tails");
        if (interaction.options.get('guess')) {
            var text = `${name} wagered ${bet} tokens that a coin would land on ${interaction.options.get('guess').value}!`;
            var result = ((interaction.options.get('guess').value == side) ? "won" : "lost");
        } else {
            var text = `${name} wagered ${bet} tokens on a coin flip!`;
            var result = ((side == "heads") ? "won" : "lost");
        }
        interaction.reply(text);
        setTimeout(() => {
            channel.send(`it landed on ${side} and ${name} ${result} ${bet} tokens!`);
        }, 2000);
    }
}
