module.exports = {
	key:"boxracing",
	async execute(args){
		const int = args.interaction;
    const db = args.database;
		const name = args.interaction.member.displayName;
    const Discord = args.Discord;
		const choice = args.interaction.options.get('guess').value;
		const bet = args.interaction.options.get('bet').value;
    
    const color = {
      black:  ":black_medium_small_square:",
      red:    ":red_square:",
		  orange: ":orange_square:",
		  yellow: ":yellow_square:",
		  green:  ":green_square:",
		  blue:   ":blue_square:",
		  purple: ":purple_square:", 
    };
    const redString    = color.red + color.black.repeat(14);
    const orangeString = color.orange + color.black.repeat(14);
    const yellowString = color.yellow + color.black.repeat(14);
    const greenString  = color.green + color.black.repeat(14);
    const blueString   = color.blue + color.black.repeat(14);
    const purpleString = color.purple + color.black.repeat(14);
		const embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle("Box Racing")
			.setDescription(`${name} wagered $${bet.toLocaleString("en-US")} that ${choice} would win!`)
			.addFields(
				{name:"__Competitors__\n\nRed",value:redString},
				{name:"**Orange**",value:orangeString},
				{name:"**Yellow**",value:yellowString},
				{name:"**Green**",value:greenString},
				{name:"**Blue**",value:blueString},
				{name:"**Purple**",value:purpleString}
			);
		const msgRef = await int.reply({embeds:[embed],fetchReply:true});
    const racers = {
      red:    1,
      orange: 1,
      yellow: 1,
      green:  1,
      blue:   1,
      purple: 1
    }

    var loop = setInterval(()=>{
      for(const color in racers){
        if(racers[color] < 15){
          racers[color] += (Math.random() > 0.5) ? 1 : 0;
        }
      }  
      var updateEmbed = embed.setFields(
        {name:"__Competitors__\n\nRed",value:color.red.repeat(racers.red)+color.black.repeat(15-racers.red)},
        {name:"**Orange**",value:color.orange.repeat(racers.orange)+color.black.repeat(15-racers.orange)},
        {name:"**Yellow**",value:color.yellow.repeat(racers.yellow)+color.black.repeat(15-racers.yellow)},
        {name:"**Green**",value:color.green.repeat(racers.green)+color.black.repeat(15-racers.green)},
        {name:"**Blue**",value:color.blue.repeat(racers.blue)+color.black.repeat(15-racers.blue)},
        {name:"**Purple**",value:color.purple.repeat(racers.purple)+color.black.repeat(15-racers.purple)},
    )

    if(Object.values(racers).find(val => val >= 15)) {
      clearInterval(loop);
    }
      msgRef.edit({embeds:[updateEmbed]});
    }, 1000)
  }
}