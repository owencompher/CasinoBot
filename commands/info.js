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
                  //Checks if all flip values are 0
                  if(userDoc.totalFlips==undefined)
            db.update({_id: member.id}, {$set: {totalFlips: 0}}, {},()=>{db.loadDatabase();});
          if(userDoc.flipWinnings==undefined)
            db.update({_id: member.id}, {$set: {flipWinnings: 0}}, {},()=>{db.loadDatabase();});
          if(userDoc.biggestWinFlip==undefined)
            db.update({_id: member.id}, {$set: {biggestWinFlip: 0}}, {},()=>{db.loadDatabase();});
          //Checks if all spin values are 0
          if(userDoc.totalSpins==undefined)
            db.update({_id: member.id}, {$set: {totalSpins: 0}}, {},()=>{db.loadDatabase();});
          if(userDoc.slotWinnings==undefined)
            db.update({_id: member.id}, {$set: {slotWinnings: 0}}, {},()=>{db.loadDatabase();});
          if(userDoc.biggestWinSlot==undefined)
            db.update({_id: member.id}, {$set: {biggestWinSlot: 0}}, {},()=>{db.loadDatabase();});
                  //Checks if all (New Game) values are 0
                  var currentExp = userDoc.levelExp;
                  var nextLevel = levels[userDoc.level];
          var newEmbed = new Discord.MessageEmbed()
          .setColor(0x3498DB)
          .setTitle(member.user.username + "'s info")
          .setDescription("**__Account Info__**\n"+"**Balance:** $"+userDoc.bal.toLocaleString("en-US")+"\n"+"**Level: **"+userDoc.level+"\n"+"**Level Progress:** "+currentExp+"/"+nextLevel+" Exp")
          .setThumbnail(member.user.avatarURL())
                  if(!(userDoc.totalFlips==undefined)){
                      newEmbed.addFields(
                          {name:"__Coin Flips__",value:"**Total Coin Flips:** "+userDoc.totalFlips.toLocaleString("en-US")+"\n**Total Winnings:** $"+userDoc.flipWinnings.toLocaleString("en-US")+"\n**Biggest Win:** $"+userDoc.biggestWinFlip.toLocaleString("en-US")}
                      )
                  }else{
                      newEmbed.addFields(
                          {name:"__Coin Flips__",value:"**Total Coin Flips:** "+0+"\n**Total Winnings:** $"+0+"\n**Biggest Win:** $"+0}
                      )
                  }
          //adds slot field
          if(!(userDoc.totalSpins==undefined)){
            newEmbed.addFields(
              {name:"__Slots__",value:"**Total Spins:** "+userDoc.totalSpins.toLocaleString("en-US")+"\n**Total Winnings:** $"+userDoc.slotWinnings.toLocaleString("en-US")+"\n**Biggest Win:** $"+userDoc.biggestWinSlot.toLocaleString("en-US")}
            )
          }else{
            newEmbed.addFields(
              {name:"__Slots__",value:"**Total Spins:** "+0+"\n**Total Winnings:** $"+0+"\n**Biggest Win:** $"+0}
            )  
          }
                  //adds (New Game) field
                  newEmbed.setFooter({text: client.user.username, iconURL: client.user.avatarURL()})
                  newEmbed.setTimestamp()
          int.reply({embeds: [newEmbed]});
        } else {
          int.reply({content: 'there was a problem getting the info from the database', ephemeral: true});
          console.log('had an issue with getting info from database for user '+member.id);
        }
        if (err) console.log('got err with db search');
      });
    }
  }