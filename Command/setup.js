const Discord = require('discord.js');
const fs = require('fs');
const config = require('../config.json');

module.exports = {
    name: "setup",
    description: "setup commande",
    /**
     * @param {Discord.Message} message
     */
    execute(message, args) {

        let { setup } = require(`../server/${message.guild.id}/CommandVerif.json`);
        if (setup === false) return message.reply(config.MsgDisable);
        
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            let msg = message.channel.send(config.MsgErrorPermissions);
            msg.then((m) => {
                message.delete();
                setTimeout(() => {
                    m.delete();
                },5000)
            });
            return;
        }
        if (!args[0]) {

            let embed = new Discord.MessageEmbed()
                .setTitle('Setup List')
                .addFields(
                    { name: '**ban**', value: 'Channel De Bannissement', inline: true },
                    { name: '**mute**', value: 'Channel De Mute', inline: true },
                    { name: '**msg**', value: 'Channel où le bot peux envoyer des messages', inline: true }
                )
                .setColor("#FFBC4D")
                .setTimestamp()
                .setFooter('Fizycol_Namania', 'https://cdn.discordapp.com/avatars/516313531721973760/cd608ae504eefebc0a2fa4c0dc1e9da5.png')
            let msg = message.channel.send(embed);
            msg.then((m) => {
                message.delete();
                setTimeout(() => {
                    m.delete();
                },10000)
            });
            return;

        }
        if (args[0] === 'ban') {

            let ChannelID = args[1];

            if (!args[1]) {
                ChannelID = message.channel.id;
            }

            let guild = message.guild;
            console.log(guild.id);

            let fileName = `./server/${guild.id}/Setup.json`;
            let file = require(`../server/${guild.id}/Setup.json`);
            file.ToSendBanMessage = ChannelID;
            fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                if (err) return console.log(err);
                console.log(JSON.stringify(file));
                console.log('writing to ' + fileName);
            });

            let channelToSend;

            guild.channels.cache.forEach((channel) => {
                if (channel.type === "text" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES") && channel.id === file.ToSendBanMessage) {
                    channelToSend = channel;
                }
            });

            if (!channelToSend) {
                return;
            }

            let msg = channelToSend.send(`L'ID du channel à été modifié avec succès !`);
            msg.then((m) => {
                message.delete();
                setTimeout(() => {
                    m.delete();
                },10000)
            });
            return;

        }
        if (args[0] === 'mute') {

            let ChannelID = args[1];

            if (!args[1]) {
                ChannelID = message.channel.id;
            }

            let guild = message.guild;
            console.log(guild.id);

            let fileName = `./server/${guild.id}/Setup.json`;
            let file = require(`../server/${guild.id}/Setup.json`);
            file.ToSendMuteMessage = ChannelID;
            fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                if (err) return console.log(err);
                console.log(JSON.stringify(file));
                console.log('writing to ' + fileName);
            });

            let channelToSend;

            guild.channels.cache.forEach((channel) => {
                if (channel.type === "text" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES") && channel.id === file.ToSendMuteMessage) {
                    channelToSend = channel;
                }
            });

            if (!channelToSend) {
                return;
            }

            let msg = channelToSend.send(`L'ID du channel à été modifié avec succès !`);
            msg.then((m) => {
                message.delete();
                setTimeout(() => {
                    m.delete();
                },10000)
            });
            return;

        }
        if (args[0] === 'msg') {

            let ChannelID = args[1];

            if (!args[1]) {
                ChannelID = message.channel.id;
            }

            let guild = message.guild;
            console.log(guild.id);

            let fileName = `./server/${guild.id}/Setup.json`;
            let file = require(`../server/${guild.id}/Setup.json`);
            file.ToSendMessage = ChannelID;
            fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                if (err) return console.log(err);
                console.log(JSON.stringify(file));
                console.log('writing to ' + fileName);
            });

            let channelToSend;

            guild.channels.cache.forEach((channel) => {
                if (channel.type === "text" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES") && channel.id === file.ToSendMessage) {
                    channelToSend = channel;
                }
            });

            if (!channelToSend) {
                return;
            }

            let msg = channelToSend.send(`L'ID du channel à été modifié avec succès !`);
            msg.then((m) => {
                message.delete();
                setTimeout(() => {
                    m.delete();
                },10000)
            });
            return;

        }
        if (args[0] === 'role') {
            if (!args[1]) {
                let msg = message.channel.send("Veuillez mettre le nom d'un rôle !");
                msg.then((m) => {
                    message.delete();
                    setTimeout(() => {m.delete()}, 5000);
                });
            }
        }
        let msg = message.channel.send(`Cet argument n'est pas valide ! utiliser la commande ".setup" pour voir lesquels sont valide !`);
        msg.then((m) => {
            message.delete();
            setTimeout(() => {m.delete()}, 10000);
        });

    }
}