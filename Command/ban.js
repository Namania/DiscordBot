const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: "ban",
    /**
     * @param {Discord.Message} message 
     */
    async execute(message, args) {

        let { ban } = require(`../server/${message.guild.id}/CommandVerif.json`);
        if (ban === false) return message.reply(config.MsgDisable);

        let guild = message.guild;
        let ChannelConfig = require(`../server/${guild.id}/Setup.json`);

        if (!message.member.hasPermission('BAN_MEMBERS')) {
            let msg = message.channel.send(`Vous n'êtes pas autorisé à bannir un autre membre !`);
            msg.then((m) => {
                message.delete();
                setTimeout(() => {
                    m.delete();
                },5000)
            });
            return;
        }

        if (ChannelConfig.ToSendBanMessage === null) {
            let msg = message.channel.send(`Vous devez d'abort configurer le channel où les messages de bannisement s'enverront avec la commande ".setup ban" !`);
            msg.then((m) => {
                message.delete();
                setTimeout(() => {
                    m.delete();
                },10000)
            });
            return;
        }
        if (ChannelConfig.ToSendMessage === null) {
            let msg = message.channel.send(`Vous devez d'abort configurer le channel où les messages de bannisement s'enverront avec la commande ".setup msg" !`);
            msg.then((m) => {
                message.delete();
                setTimeout(() => {
                    m.delete();
                },10000)
            });
            return;
        }

        let user = message.mentions.users.first();
        
        if (!user) {
            let msg = message.channel.send(`L'utilisateur n'est pas correct !`);
            msg.then((m) => {
                message.delete();
                setTimeout(() => {
                    m.delete();
                },5000)
            });
            return;
        }

        if (user.id === config.IdBot) {
            let msg = message.channel.send(`Vous ne pouvez pas ban le bot !`);
            msg.then((m) => {
                message.delete();
                setTimeout(() => {
                    m.delete();
                },5000)
            });
            return;
        }
        
        let channelToSend;
        let channelForSend;

        guild.channels.cache.forEach((channel) => {
            if (channel.type === "text" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES") && channel.id === ChannelConfig.ToSendBanMessage) {
                channelToSend = channel;
            }
        });

        if (!channelToSend) {
            return;
        }

        let [, days, reason] = args;

        guild.members.ban(user, {days, reason}).then(u => {
            let msg = channelToSend.send(`L'utilisateur ${u.username} à été banni du server pour une durée de **${days}** jours pour la raison suivante : **${reason}**`);
            msg.then((m) => {

                guild.channels.cache.forEach((channel) => {
                    if (channel.type === "text" && !channelForSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES") && channel.id === setup.ToSendMessage) {
                        channelForSend = channel;
                    }
                });
        
                if (!channelForSend) {
                    return;
                }

                channelForSend.send(`<@` + user.id +`> à été banni du server !`);

                message.delete();
            });
        });
    
    }
}