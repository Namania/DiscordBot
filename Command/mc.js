const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'mc',
    description: 'Test commande',
    execute(message) {
        let { mc } = require(`../server/${message.guild.id}/CommandVerif.json`);
        if (mc === false) return message.reply(config.MsgDisable);
        let embed = new Discord.MessageEmbed()
            .setTitle("Minecraft")
            .setDescription(`Agate-Mod -> EN COURS DE DEVELOPPEMENT !\n`)
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: 'Resource Pack', value: 'Faithful-1.16.1_SF', inline: true },
                { name: 'ShaderPack', value: 'BSL_v7.2.01\nSildurs Vibrant', inline: true },
            )
            .setColor("#FFBC4D")
            .setTimestamp()
            .setFooter('Fizycol_Namania', 'https://cdn.discordapp.com/avatars/516313531721973760/cd608ae504eefebc0a2fa4c0dc1e9da5.png')
        let msg = message.channel.send(embed);
        msg.then((m) => {
            setTimeout(() => {
                message.delete();
            }, 1);
            setTimeout(() => {
                m.delete();
            }, 20000);
        });
    }
}