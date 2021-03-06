const Discord = require('discord.js');
const weather = require('weather-js');

exports.run = (client, message, args) => {
  weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
      if (err) message.channel.send(err);
      if (result === undefined || result.length === 0) {
          message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Please enter a location.').setColor('RANDOM'));
          return;
      }
      var current = result[0].current;
      var location = result[0].location;
      const embed = new Discord.RichEmbed()
          .setDescription(`**${current.skytext}**`)
          .setAuthor(`${current.observationpoint}'s Weather'`)
          .setThumbnail(current.imageUrl)
          .setColor(0x00AE86)
          .addField('Timezone',`UTC${location.timezone}`, true)
          .addField('Degree type',location.degreetype, true)
          .addField('Tempature',`${current.temperature} Degree`, true)
          .addField('Feels like', `${current.feelslike}`, true)
          .addField('Wind',current.winddisplay, true)
          .addField('Humidity', `${current.humidity}%`, true)
          message.channel.send({embed});
  })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "weather",
   category: "General",
  description: "Shows weather",
  usage: "weather"
};