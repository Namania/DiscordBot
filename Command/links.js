const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'links',
    description: 'Test commande',
    execute(message) {
        let { links } = require(`../server/${message.guild.id}/CommandVerif.json`);
        if (links === false) return message.reply(config.MsgDisable);
        let embed = new Discord.MessageEmbed()
            .setTitle("Namania's Links")
            .setDescription(`Youtube -> https://www.youtube.com/channel/UCNlCq7jtjJhnj7yFPs99-xw\nDiscord -> https://discord.gg/9kw9mKfSEC\nInsta -> https://www.instagram.com/fizycol_namania/`)
            .setColor("#FFBC4D")
            .setTimestamp()
            .setFooter('Fizycol_Namania', 'https://cdn.discordapp.com/avatars/516313531721973760/cd608ae504eefebc0a2fa4c0dc1e9da5.png')
        message.channel.send(embed);
    }
}