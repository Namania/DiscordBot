const config = require('../config.json');

module.exports = {
    name: "unmute",
    description: "unMute Commande",
    execute(message) {

        let { unmute } = require(`../server/${message.guild.id}/CommandVerif.json`);
        if (unmute === false) return message.reply(config.MsgDisable);

        let setup = require(`../server/${message.guild.id}/Setup.json`);
        let guild = message.guild;
        let channelToSend;
        let channelForSend;

        if (!message.member.hasPermission('BAN_MEMBERS')) {
            let msg = message.channel.send(config.MsgErrorPermissions);
            msg.then((m) => {
                message.delete();
                setTimeout(() => {
                    m.delete();
                });
            });
            return;
        }

        if (setup.ToSendMuteMessage === null) {
            let msg = message.channel.send(`Vous devez d'abort configurer le channel où les messages de bannisement s'enverront avec la commande ".setup mute" !`);
            msg.then((m) => {
                message.delete();
                setTimeout(() => {
                    m.delete();
                },10000)
            });
            return;
        }
        if (setup.ToSendMessage === null) {
            let msg = message.channel.send(`Vous devez d'abort configurer le channel où les messages de bannisement s'enverront avec la commande ".setup msg" !`);
            msg.then((m) => {
                message.delete();
                setTimeout(() => {
                    m.delete();
                },10000)
            });
            return;
        }

        let user = message.mentions.members.first();

        if (!user || user === undefined) {
            let msg = message.channel.send("Utilisateur non trouver...");
            msg.then((m) => {
                message.delete();
                setTimeout(() => {
                    m.delete();
                }, 5000);
            });
            return;
        }

        if (!user.roles.cache.has(setup.Muted)) {
            let msg = message.channel.send("Cette personne n'est pas mute !");
            msg.then((m) => {
                message.delete();
                setTimeout(() => {
                    m.delete();
                }, 5000);
            });
            return;
        }

        guild.channels.cache.forEach((channel) => {
            if (channel.type === "text" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES") && channel.id === setup.ToSendMuteMessage) {
                channelToSend = channel;
            }
        });

        if (!channelToSend) {
            return;
        }

        user.roles.remove(setup.Muted).then((u) => {
            let msg = channelToSend.send(`L'utilisateur **${user.displayName}** à été unmute par **${message.author.username}**`);
            msg.then((m) => {

                guild.channels.cache.forEach((channel) => {
                    if (channel.type === "text" && !channelForSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES") && channel.id === setup.ToSendMessage) {
                        channelForSend = channel;
                    }
                });

                if (!channelForSend) {
                    return;
                }

                channelForSend.send(`<@` + user.id +`> à été demute du server !`);

                message.delete();
                
            });
        });
    }
}