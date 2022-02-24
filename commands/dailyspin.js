module.exports = {
	key: "dailyspin",
	execute(args){
		const int = args.interaction;
    const db = args.database;
		const name = args.interaction.member.displayName;
    const client = args.client;
    const Discord = args.Discord;
		const channel = args.interaction.channel
		const wheel = ["<:1_Million:945824326488326184>","<:50_K:945825697941819442>","<:100_K:945825314150428692>","<:75_K:945825687414132756>","<:500_K:945824824838717522>","<:50_K:945825697941819442>","<:75_K:945825687414132756>","<:250_K:945825149901504542>","<:50_K:945825697941819442>","<:100_K:945825314150428692>"]
		if (int.options.get('user')) {
      var member = int.options.get('user').member;
    } else {
      var member = int.member
    }
		db.findOne({_id: member.user.id}, async(err,userDoc)=>{
			var wheelRandom = Math.floor(Math.random()*10);
			var time = new Date().getTime();
			if(userDoc.lastSpin==undefined)
				db.update({_id: member.id}, {$set: {lastSpin: 0}}, {},()=>{db.loadDatabase();});
			var lastSpin = userDoc.lastSpin
			if(time-lastSpin>86400000){
				const newEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
      	.setTitle("Daily Spin")
      	.setDescription("Your daily spin")
				.addFields(
					{name:"Wheel",value:wheel[0]+wheel[1]+wheel[2],inline:true}
				)
				const msgRef = await int.reply({embeds:[newEmbed],fetchReply:true});
				var count = 0;
				var emojiRow1 = 0;
				var emojiRow2 = 1;
				var emojiRow3 = 2;
				
				var loop = setInterval(()=>{
					const updateEmbed = new Discord.MessageEmbed()
					.setColor('#0099ff')
      		.setTitle("Daily Spin")
      		.setDescription("Your daily spin")
					.addFields(
						{name:"Wheel",value:wheel[emojiRow1]+wheel[emojiRow2]+wheel[emojiRow3],inline:true}
					)
					emojiRow1++;
					emojiRow2++;
					emojiRow3++;
					if(emojiRow1>9)
						emojiRow1 = 0;
					if(emojiRow2>9)
						emojiRow2 = 0;
					if(emojiRow3>9)
						emojiRow3 = 0;
					
					if(count==wheelRandom+10){
						clearInterval(loop);
						if(wheel[emojiRow1]=="<:1_Million:945824326488326184>"){
							userDoc.bal+=1000000;
							channel.send(`${name} won $1,000,000 from their daily wheel!`)
							db.update({_id: member.id}, {$set: {bal:userDoc.bal,lastSpin: time}}, {},()=>{db.loadDatabase();});
						}else if(wheel[emojiRow1]=="<:500_K:945824824838717522>"){
							userDoc.bal+=500000;
							channel.send(`${name} won $500,000 from their daily wheel!`)
							db.update({_id: member.id}, {$set: {bal:userDoc.bal,lastSpin: time}}, {},()=>{db.loadDatabase();});
						}else if(wheel[emojiRow1]=="<:250_K:945825149901504542>"){
							userDoc.bal+=250000;
							channel.send(`${name} won $250,000 from their daily wheel!`)
							db.update({_id: member.id}, {$set: {bal:userDoc.bal,lastSpin: time}}, {},()=>{db.loadDatabase();});
						}else if(wheel[emojiRow1]=="<:100_K:945825314150428692>"){
							userDoc.bal+=100000;
							channel.send(`${name} won $100,000 from their daily wheel!`)
							db.update({_id: member.id}, {$set: {bal:userDoc.bal,lastSpin: time}}, {},()=>{db.loadDatabase();});
						}else if(wheel[emojiRow1]=="<:75_K:945825687414132756>"){
							userDoc.bal+=75000;
							channel.send(`${name} won $75,000 from their daily wheel!`)
							db.update({_id: member.id}, {$set: {bal:userDoc.bal,lastSpin: time}}, {},()=>{db.loadDatabase();});
						}else{
							userDoc.bal+=50000;
							channel.send(`${name} won $50,000 from their daily wheel!`)
							db.update({_id: member.id}, {$set: {bal:userDoc.bal,lastSpin: time}}, {},()=>{db.loadDatabase();});
						}
					}
					count++
					msgRef.edit({embeds:[updateEmbed]})
				},1000)
			}else{
				var timeTillSpinSring;
				var timeTillSpin = 86400000-(time-lastSpin)
				var hours = Math.floor(((timeTillSpin))/3600000)
				var minutes = Math.floor(((timeTillSpin-3600000*hours))/60000)
				var seconds = Math.floor(((timeTillSpin-3600000*hours-60000*minutes))/1000)
				if(minutes<10)
					minutes = "0"+minutes
				if(seconds<10)
					seconds = "0"+seconds
				timeTillSpinString = hours+":"+minutes+":"+seconds;
				int.reply("You need to wait "+timeTillSpinString+" before your daily spin");
			}
		})
	}
}