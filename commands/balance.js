module.exports = {
    key: "balance",
    execute(arg) {
        const int = arg.interaction;
        const db = arg.database;
        if (int.options.get('user')) {
            var member = int.options.get('user').member;
        } else {
            var member = int.member
        }
        db.findOne({_id: member.user.id}, (err, userDoc) => {
            if (userDoc) {
                int.reply({content: `${member.displayName}'s balance is ${userDoc.bal}`, ephemeral: true});
            } else {
                arg.interaction.reply({content: 'there was a problem getting the info from the database', ephemeral: true});
                console.log('had an issue with getting info from database for user '+member.id);
            }
        })
    }
}