const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'server',
    description: 'Test commande',
    execute(message) {
        let { server } = require(`../server/${message.guild.id}/CommandVerif.json`);
        if (server === false) return message.reply(config.MsgDisable);
        let embed = new Discord.MessageEmbed()
            .setTitle("Server Info")
            .setDescription(`Nom du Server : ${message.guild.name}\nNombre d'utilisateurs : ${message.guild.memberCount}`)
            .setColor("#FFBC4D")
        let msg = message.channel.send(embed);
        msg.then((m) => {
            message.delete();
            setTimeout(() => {
                m.delete();
            }, 5000);
        });
    }
}