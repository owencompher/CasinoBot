module.exports = {
  key:"info",
  execute(args){
    const int = args.interaction;
    const db = args.database;
    const client = args.client;
    const Discord = args.Discord;
    const levels = args.client.levels;
    if (int.options.get('user')) {
      var member = int.options.get('user').member;
    } else {
      var member = int.member
    }
    db.findOne({_id: member.user.id}, (err,userDoc)=>{
      if (userDoc) {
        var newEmbed = new Discord.MessageEmbed()
          .setColor(0x3498DB)
          .setTitle(`${member.user.username}'s info`)
          .setThumbnail(member.user.avatarURL())
          .addFields(
            {name:"**__Account Info__**", value:`
**Balance:** ${userDoc.bal}
**Level:** ${userDoc.level}
**Level Progress:** ${userDoc.levelExp}/${levels[userDoc.level]}`}
          )
          .setFooter({text: client.user.username, iconURL: client.user.avatarURL()})
          .setTimestamp();
        int.reply({embeds: [newEmbed]});
      } else {
        int.reply({content: 'there was a problem getting the info from the database', ephemeral: true});
        console.log('had an issue with getting info from database for user '+member.id);
      }
      if (err) console.log('got err with db search');
    });
  }
}