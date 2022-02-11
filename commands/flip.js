module.exports = {
    key: "flip",
    execute(arg) {
        const channel = arg.interaction.channel
        const name = arg.interaction.member.displayName;
        const bet = arg.interaction.options.get('bet').value;
        const side = (Math.random() > 0.5 ? "heads" : "tails");
        arg.database.findOne({_id: arg.interaction.user.id}, (err, user) => {
            if (user) {
                if (user.bal >= bet) {
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
                        user.bal += ((result == "won" ? bet : -bet));
                        arg.database.update({_id: arg.interaction.user.id}, {$set: {bal: user.bal}}, {}, ()=>{});
                    }, 2000);
                } else arg.interaction.reply({content: 'you dont have that many tokens to bet!', ephemeral: true});
            } else {
                arg.interaction.reply({content: 'there was a problem getting your info from the database', ephemeral: true});
                console.log(arg.interaction.user.id + ' had an issue with getting info from database');
            }
        });
    }
}
