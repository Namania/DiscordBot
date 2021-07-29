const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: "unban",
    /**
     * @param {Discord.Message} message 
     */
    async execute(message, args) {

        let { unban } = require(`../server/${message.guild.id}/CommandVerif.json`);
        if (unban === false) return message.reply(config.MsgDisable);

        let guild = message.guild;
        let ChannelConfig = require(`../server/${guild.id}/Channel.json`);

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
                },5000)
            });
            return;
        }

        if (ChannelConfig.ToSendMessage === null) {
            let msg = message.channel.send(`Vous devez d'abort configurer le channel où les messages de bannisement s'enverront avec la commande ".setup msg" !`);
            msg.then((m) => {
                message.delete();
                setTimeout(() => {
                    m.delete();
                },5000)
            });
            return;
        }

        let [username] = args;

        guild.fetchBans().then((bans) => {

            let bannedUser = bans.find((b) => b.user.username == username);
            
            if (!bannedUser) {
                let msg = message.channel.send(`L'utilisateur n'est pas correct !`);
                msg.then((m) => {
                    message.delete();
                    setTimeout(() => {
                        m.delete();
                    },5000);
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

            guild.members.unban(bannedUser.user).then(u => {
                let msg = channelToSend.send(`L'utilisateur ${u.username} à été banni du server !`);
                msg.then((m) => {

                    guild.channels.cache.forEach((channel) => {
                        if (channel.type === "text" && !channelForSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES") && channel.id === setup.ToSendMessage) {
                            channelForSend = channel;
                        }
                    });
            
                    if (!channelForSend) {
                        return;
                    }
    
                    channelForSend.send(`<@` + user.id +`> à été debanni du server !`);

                    message.delete();

                });
            });
        });

    }
}