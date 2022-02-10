module.exports = {
    key: "flip",
    execute(arg) {
        const channel = arg.interaction.channel
        const name = arg.interaction.member.displayName;
        const bet = arg.interaction.options.get('bet').value;
        const side = (Math.random() > 0.5 ? "heads" : "tails");
        if (arg.interaction.options.get('guess')) {
            var text = `${name} wagered ${bet} tokens that a coin would land on ${arg.interaction.options.get('guess').value}!`;
            var result = ((arg.interaction.options.get('guess').value == side) ? "won" : "lost");
        } else {
            var text = `${name} wagered ${bet} tokens on a coin flip!`;
            var result = ((side == "heads") ? "won" : "lost");
        }
        arg.interaction.reply(text);
        setTimeout(() => {
            channel.send(`it landed on ${side} and ${name} ${result} ${bet} tokens!`);
        }, 2000);
    }
}
