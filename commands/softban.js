const { RichEmbed } = require("discord.js")

exports.run = async (client, message, args, level) => {

  		const settings = client.getSettings(message.guild);


   let banMember = message.mentions.members.first() || message.guild.members.get(args[0]) 
   if(!banMember) return message.channel.send("Please provide a user to ban!")

   let reason = args.slice(1).join(" ");
   if(!reason) reason = "No reason given!"

   if(!message.guild.me.hasPermission(["BAN_MEMBERS"])) return message.channel.send("I dont have permission to perform this command")

   banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() =>
   message.guild.ban(banMember, { days: 1, reason: reason})).then(() => message.guild.unban(banMember.id, { reason: "Softban"})).catch(err => console.log(err))

   message.channel.send(`**${banMember.user.tag}** has been banned`).then(m => m.delete(5000))

    let embed = new RichEmbed()
    .setColor("RED")
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "ban")
    .addField("Mutee:", banMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.find("name", settings.modLogChannel)
        sChannel.send(embed)
   



    }
    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: [],
        permLevel: "Administrator"
      };
      
      exports.help = {
        name: "softban",
        category: "Moderation",
        description: "Softbans a user from the guild!",
        usage: "softban"
      };