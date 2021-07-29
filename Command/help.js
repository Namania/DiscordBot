const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'help',
    description: 'Test commande',
    /**
     * @param {Discord.Message} message 
     */
    execute(message) {
        let { help } = require(`../server/${message.guild.id}/CommandVerif.json`);
        if (help === false) return message.reply(config.MsgDisable);

        message.delete();

        if (message.member.hasPermission('BAN_MEMBERS')) {
            let embed = new Discord.MessageEmbed()
                .setTitle("Help")
                .setDescription(`\u200B\n**|     ban\n|     cl\n|     help\n|     invite\n|     links\n|     mc\n|     mute\n|     ping\n|     server\n|     setup\n|     sw\n|     tempmute\n|     ticket\n|     unban\n|     unmute**\n\u200B`)
                .setColor("#FFBC4D")
                .setTimestamp()
                .setFooter('Fizycol_Namania', 'https://cdn.discordapp.com/avatars/516313531721973760/cd608ae504eefebc0a2fa4c0dc1e9da5.png')
            message.author.createDM().then(c => {c.send(embed)});
        }
        else {
            let embed = new Discord.MessageEmbed()
                .setTitle("Help")
                .setDescription(`\u200B\n**|     help\n|     invite\n|     links\n|     mc\n|     ping\n|     server\n|     ticket**\n\u200B`)
                .setColor("#FFBC4D")
                .setTimestamp()
                .setFooter('Fizycol_Namania', 'https://cdn.discordapp.com/avatars/516313531721973760/cd608ae504eefebc0a2fa4c0dc1e9da5.png')
            message.author.createDM().then(c => {c.send(embed)});
        }

    }
}