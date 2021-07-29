const Discord = require('discord.js');
const fs = require('fs');
const glob = require('glob');
const config = require('../config.json');

module.exports = {
    name: "ticket",
    description: "ticken for send a report",
    /**
     * @param {Discord.Message} message 
     */
    execute(message, args) {

        let { ticket } = require(`../server/${message.guild.id}/CommandVerif.json`);
        if (ticket === false) return message.reply(config.MsgDisable);

        let guild = message.guild;
        let ChekToken = false;
        let TicketToken = '';

        if (!args[0]) {
            let msg = message.channel.send(`Veuillez mettre un titre à votre ticket !`);
            msg.then((m) => {
                message.delete();
                setTimeout(() => {
                    m.delete();
                }, 5000);
            });
            return;
        }
        if (args[0] === 'list') {

            if (message.member.hasPermission('ADMINISTRATOR')) {
                let msg = message.channel.send(config.MsgErrorPermissions);
                msg.then((m) => {
                    message.delete();
                    setTimeout(() => {
                        m.delete();
                    }, 5000);
                });
            }

            message.delete();
            
            GlobList();
            
            return;

        }
        if (args[0] === 'edit') {

            if (!args[1]) {
                let msg = message.channel.send(`Veuillez mettre le token de votre ticket !`);
                msg.then((m) => {
                    message.delete();
                    setTimeout(() => {
                        m.delete();
                    }, 10000);
                });
                return;
            }
            if (args[1]) {
                IfTokenIsUse(args[1]);
                if (ChekToken === false) {
                    let msg = message.channel.send(`Le token que vous avez mis est incorrect !`);
                    msg.then((m) => {
                        message.delete();
                        setTimeout(() => {
                            m.delete();
                        }, 10000);
                    });
                    return;
                }
            }

            let TicketFile = require(`../server/${guild.id}/ticket/${args[1]}.json`);

            if (!message.author.id === TicketFile.id) {
                let msg = message.channel.send(`Vous n'êtes pas à l'origine de ce ticket ! Veuillez mettre un tocken qui vous appartient !`);
                msg.then((m) => {
                    message.delete();
                    setTimeout(() => {
                        m.delete();
                    }, 5000);
                });
            }
            
            if (!args[2]) {
                let msg = message.channel.send(`Veuillez choisir ce que vous voulez modifier entre le Titre et le Contenu !`);
                msg.then((m) => {
                    message.delete();
                    setTimeout(() => {
                        m.delete();
                    }, 10000);
                });
                return;
            }
            if (args[2] === 'title') {
                if (!args[3]) {
                    let msg = message.channel.send(`Veuillez choisir par quoi vous voulez remplacer le titre actuel !`);
                    msg.then((m) => {
                        message.delete();
                        setTimeout(() => {
                            m.delete();
                        }, 10000);
                    });
                    return;
                }

                message.delete();

                WriteTicketTitle(args[1], args[3]);

                let TokenPath = require(`../server/${guild.id}/ticket/${args[1]}.json`);

                let embTitle= new Discord.MessageEmbed()
                    .setTitle('Résumé')
                    .setColor("#FFBC4D")
                    .setDescription(`\nVotre ticket à bien été modifié !\n\n**Titre** : ${args[3]}\n**Contenu** : ${TokenPath.TicketContent}\n\nVeuillez Garder votre token pour modifier votre ticket si besoins :\n**${TokenPath.TicketToken}**\n\u200B`)
                    .setTimestamp()
                    .setFooter('Fizycol_Namania', 'https://cdn.discordapp.com/avatars/516313531721973760/cd608ae504eefebc0a2fa4c0dc1e9da5.png')

                message.author.createDM().then(c => {c.send(embTitle)});

            }
            if (args[2] === 'contenu') {
                if (!args[3]) {
                    let msg = message.channel.send(`Veuillez choisir par quoi vous voulez remplacer le contenu actuel !`);
                    msg.then((m) => {
                        message.delete();
                        setTimeout(() => {
                            m.delete();
                        }, 10000);
                    });
                    return;
                }

                message.delete();
                
                WriteTicketContent(args[1], args.slice(3).join(" "));

                let TokenPath = require(`../server/${guild.id}/ticket/${args[1]}.json`);

                let embTitle= new Discord.MessageEmbed()
                    .setTitle('Résumé')
                    .setColor("#FFBC4D")
                    .setDescription(`\nVotre ticket à bien été modifié !\n\n**Titre** : ${TokenPath.TicketTitle}\n**Contenu** : ${args.slice(3).join(" ")}\n\nVeuillez Garder votre token pour modifier votre ticket si besoins :\n**${TokenPath.TicketToken}**\n\u200B`)
                    .setTimestamp()
                    .setFooter('Fizycol_Namania', 'https://cdn.discordapp.com/avatars/516313531721973760/cd608ae504eefebc0a2fa4c0dc1e9da5.png')

                message.author.createDM().then(c => {c.send(embTitle)});

            }

            return;

        }
        if (args[0] === 'rm') {

            if (!args[1]) {
                let msg = message.channel.send(`Veuillez mettre le token de votre ticket !`);
                msg.then((m) => {
                    message.delete();
                    setTimeout(() => {
                        m.delete();
                    }, 10000);
                });
                return;
            }

            IfTokenIsUse(args[1]);
            
            if (ChekToken === false) {
                let msg = message.channel.send(`Le token que vous avez mis est incorrect !`);
                msg.then((m) => {
                    message.delete();
                    setTimeout(() => {
                        m.delete();
                    }, 10000);
                });
                return;
            }

            let TicketFile = require(`../server/${guild.id}/ticket/${args[1]}.json`);

            if (!message.author.id === TicketFile.id) {
                let msg = message.channel.send(`Vous n'êtes pas à l'origine de ce ticket ! Veuillez mettre un tocken qui vous appartient !`);
                msg.then((m) => {
                    message.delete();
                    setTimeout(() => {
                        m.delete();
                    }, 5000);
                });
            }

            let path = `./server/${guild.id}/ticket/${args[1]}.json`;

            fs.unlink(path, (err) => {
            if (err) {
                console.error(err)
                return
            }});

            let msg = message.channel.send(`Votre ticket à été correctement supprimer !`);
            msg.then((m) => {
                message.delete();
                setTimeout(() => {
                    m.delete();
                }, 5000);
            });

            return;

        }
        if (!args[1]) {
            let msg = message.channel.send(`Veuillez mettre un contenu à votre ticket !`);
            msg.then((m) => {
                message.delete();
                setTimeout(() => {
                    m.delete();
                }, 5000);
            });
            return;
        }

        message.delete();

        GeneratePassowd();

        fs.copyFile(`./Default/ticket/default.json`, `./server/${guild.id}/ticket/${TicketToken}.json`, (err) => {
            if (err) return console.log(err);
            console.log(`./${TicketToken}.json was copied to ${guild.id}`);
        });

        let e = new Discord.MessageEmbed()
            .setTitle('Résumé')
            .setColor("#FFBC4D")
            .setDescription(`\nVotre ticket à bien été envoyer !\n\n**Titre** : ${args[0]}\n**Contenu** : ${args.slice(1).join(" ")}\n\nVeuillez Garder votre token pour modifier votre ticket si besoins :\n**${TicketToken}**\n\u200B`)
            .setTimestamp()
            .setFooter('Fizycol_Namania', 'https://cdn.discordapp.com/avatars/516313531721973760/cd608ae504eefebc0a2fa4c0dc1e9da5.png')

        message.author.createDM().then(c => {c.send(e)});

        setTimeout(() => {
            WriteUserName();
            WriteId();
            WriteTicketToken();
            WriteTicketTitle(TicketToken, args[0]);
            WriteTicketContent(TicketToken, args.slice(1).join(" "));
        }, 2000);

        function WriteUserName() {
            let fileName = `./server/${guild.id}/ticket/${TicketToken}.json`;
            let file = require(`../server/${guild.id}/ticket/${TicketToken}.json`);
            file.UserName = message.author.username;
            fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                if (err) return console.log(err);
                console.log(JSON.stringify(file));
                console.log('writing to ' + fileName);
            });
        }
        function WriteId() {
            let fileName = `./server/${guild.id}/ticket/${TicketToken}.json`;
            let file = require(`../server/${guild.id}/ticket/${TicketToken}.json`);
            file.id = message.author.id;
            fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                if (err) return console.log(err);
                console.log(JSON.stringify(file));
                console.log('writing to ' + fileName);
            });
        }
        function WriteTicketToken() {
            let fileName = `./server/${guild.id}/ticket/${TicketToken}.json`;
            let file = require(`../server/${guild.id}/ticket/${TicketToken}.json`);
            file.TicketToken = TicketToken;
            fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                if (err) return console.log(err);
                console.log(JSON.stringify(file));
                console.log('writing to ' + fileName);
            });
        }
        function WriteTicketTitle(tocken, wtt) {
            let fileName = `./server/${guild.id}/ticket/${tocken}.json`;
            let file = require(`../server/${guild.id}/ticket/${tocken}.json`);
            file.TicketTitle = wtt;
            fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                if (err) return console.log(err);
                console.log(JSON.stringify(file));
                console.log('writing to ' + fileName);
            });
        }
        function WriteTicketContent(tocken, wtc) {
            let fileName = `./server/${guild.id}/ticket/${tocken}.json`;
            let file = require(`../server/${guild.id}/ticket/${tocken}.json`);
            file.TicketContent = wtc;
            fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                if (err) return console.log(err);
                console.log(JSON.stringify(file));
                console.log('writing to ' + fileName);
            });
        }
        function GeneratePassowd() {

            let DataLowerCase = "azertyuiopqsdfghjklmwxcvbn".split('');
            let DataUpperCase = "AZERTYUIOPQSDFGHJKLMWXCVBN".split('');
            let DataNumbers = "0123456789".split('');

            let Range = 16;

            let t = true

            let Data = [].concat(
                t === true ? DataLowerCase : [],
                t === true ? DataUpperCase : [],
                t === true ? DataNumbers : []
            );

            for (let i = 0;i < Range; i++) {
                TicketToken += Data[Math.floor(Math.random() * Data.length)];
            }

        }
        function GlobList() {

            glob(`./server/${guild.id}/ticket/*.json`, function(err, files) { // read the folder or folders if you want: example json/**/*.json
                if(err) {
                console.log("cannot read the folder, something goes wrong with glob", err);
                }
                
                var matters = [];
                if (files.length == 0){
                    let msg = message.channel.send(`Aucun ticket n'as été trouver pour le server **${guild.name}**`);
                    msg.then((m) => {
                        setTimeout(() => {
                            m.delete();
                        }, 5000);
                    });
                } else {
                    files.forEach( function(file) {
                        console.log (file);
                        fs.readFile(file, 'utf8', function (err, data) { // Read each file
                            if(err) {
                                console.log("cannot read the file, something goes wrong with the file", err);
                            }
                            var obj = JSON.parse(data);
                            message.author.createDM().then(c => {c.send(`\u200B\n| **User Name :** ${obj.UserName}\n| **User id :** ${obj.id}\n| **Ticket tocken :** ${obj.TicketToken} \n\n${obj.TicketTitle}\n${obj.TicketContent}\n\u200B`)});
                        });
                    });
                }
                return matters;
            });

        }
        function IfTokenIsUse(TockenInput) {
            
            let path = `./server/${guild.id}/ticket/${TockenInput}.json`;
            
            if (fs.existsSync(path)) {
                ChekToken = true;
            }

        }

    }
}