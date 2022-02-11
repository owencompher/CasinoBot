module.exports = {
    key: 'setbal',
    execute(arg) {
        const int = arg.interaction;
        const db = arg.database;
        const member = int.options.get('user').member;
        const amount = int.options.get('amount').value;
        db.findOne({_id: member.user.id}, (err, userDoc) => {
            if (userDoc) {
                db.update({_id: member.id}, {$set: {bal: amount}}, {}, ()=>{});
                int.reply({content: `Set ${member.displayName}'s balance to ${amount}`, ephemeral: true});
            } else {
                arg.interaction.reply({content: 'there was a problem getting the info from the database', ephemeral: true});
                console.log('had an issue with getting info from database for user '+member.id);
            }
        })
    }
}
