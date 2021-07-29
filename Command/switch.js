const Discord = require('discord.js');
const fs = require('fs');
const config = require(`../config.json`);

module.exports = {
    name: 'sw',
    description: 'Test commande',
    /**
     * @param {Discord.Message} message 
     */
    execute(message, args) {

        if (!message.member.hasPermission('ADMINISTRATOR')) {
            let msg = message.channel.send(config.MsgErrorPermissions);
            msg.then((m) => {
                setTimeout(() => {
                    message.delete();
                    m.delete();
                }, 10000);
            });
            return;
        }

        let { server, links, help, mc, clear, ban, unban, tempmute, mute, unmute, setup, ticket } = require(`../server/${message.guild.id}/CommandVerif.json`);

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        if (args[0] === 'list') {
            let embed = new Discord.MessageEmbed()
                .setTitle('Stats Of Commands')
                .setDescription(` -> **server** = **${server}**\n -> **links** = **${links}**\n -> **help** = **${help}**\n -> **mc** = **${mc}**\n -> **clear** = **${clear}**\n -> **ban** = **${ban}**\n -> **unban** = **${unban}**\n -> **mute** = **${mute}**\n -> **tempmute** = **${tempmute}**\n -> **unmute** = **${unmute}**\n -> **setup** = **${setup}**\n -> **ticket** = **${ticket}**`)
                .setColor("#FFBC4D")
            let msg = message.channel.send(embed);
            msg.then((m) => {
                setTimeout(() => {
                    message.delete();
                    m.delete();
                }, 10000);
            });
        }
        else if (args[0] === 'server') {
            if (server === false) {
                console.log('server set to true');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.server = true;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => true`);
                    let msg = message.channel.send(`${args[0]} is now enable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
            if (server === true) {
                console.log('server set to false');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.server = false;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => false`);
                    let msg = message.channel.send(`${args[0]} is now disable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
        }
        else if (args[0] === 'links') {
            if (links === false) {
                console.log('links set to true');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.links = true;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => true`);
                    let msg = message.channel.send(`${args[0]} is now enable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
            if (links === true) {
                console.log('links set to false');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.links = false;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => false`);
                    let msg = message.channel.send(`${args[0]} is now disable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });    
                });
            }
        }
        else if (args[0] === 'help') {
            if (help === false) {
                console.log('help set to true');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.help = true;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => true`);
                    let msg = message.channel.send(`${args[0]} is now enable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
            if (help === true) {
                console.log('help set to false');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.help = false;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => false`);
                    let msg = message.channel.send(`${args[0]} is now disable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
        }
        else if (args[0] === 'mc') {
            if (mc === false) {
                console.log('mc set to true');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.mc = true;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => true`);
                    let msg = message.channel.send(`${args[0]} is now enable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
            if (mc === true) {
                console.log('mc set to false');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.mc = false;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => false`);
                    let msg = message.channel.send(`${args[0]} is now disable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
        }
        else if (args[0] === 'cl') {
            if (clear === false) {
                console.log('clear set to true');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.clear = true;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => true`);
                    let msg = message.channel.send(`${args[0]} is now enable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
            if (clear === true) {
                console.log('clear set to false');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.clear = false;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => false`);
                    let msg = message.channel.send(`${args[0]} is now disable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
        }
        else if (args[0] === 'ban') {
            if (ban === false) {
                console.log('ban set to true');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.ban = true;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => true`);
                    let msg = message.channel.send(`${args[0]} is now enable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
            if (ban === true) {
                console.log('ban set to false');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.ban = false;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => false`);
                    let msg = message.channel.send(`${args[0]} is now disable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
        }
        else if (args[0] === 'unban') {
            if (unban === false) {
                console.log('unban set to true');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.unban = true;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => true`);
                    let msg = message.channel.send(`${args[0]} is now enable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
            if (unban === true) {
                console.log('unban set to false');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.unban = false;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => false`);
                    let msg = message.channel.send(`${args[0]} is now disable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
        }
        else if (args[0] === 'mute') {
            if (mute === false) {
                console.log('mute set to true');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.mute = true;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => true`);
                    let msg = message.channel.send(`${args[0]} is now enable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
            if (mute === true) {
                console.log('mute set to false');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.mute = false;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => false`);
                    let msg = message.channel.send(`${args[0]} is now disable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
        }
        else if (args[0] === 'tempmute') {
            if (tempmute === false) {
                console.log('tempmute set to true');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.tempmute = true;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => true`);
                    let msg = message.channel.send(`${args[0]} is now enable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
            if (tempmute === true) {
                console.log('tempmute set to false');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.tempmute = false;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => false`);
                    let msg = message.channel.send(`${args[0]} is now disable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
        }
        else if (args[0] === 'unmute') {
            if (unmute === false) {
                console.log('unmute set to true');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.unmute = true;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => true`);
                    let msg = message.channel.send(`${args[0]} is now enable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
            if (unmute === true) {
                console.log('unmute set to false');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.unmute = false;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => false`);
                    let msg = message.channel.send(`${args[0]} is now disable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
        }
        else if (args[0] === 'setup') {
            if (setup === false) {
                console.log('setup set to true');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.setup = true;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => true`);
                    let msg = message.channel.send(`${args[0]} is now enable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
            if (setup === true) {
                console.log('setup set to false');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.setup = false;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => false`);
                    let msg = message.channel.send(`${args[0]} is now disable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
        }
        else if (args[0] === 'ticket') {
            if (ticket === false) {
                console.log('ticket set to true');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.ticket = true;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => true`);
                    let msg = message.channel.send(`${args[0]} is now enable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
            if (ticket === true) {
                console.log('ticket set to false');
                let fileName = `./server/${message.guild.id}/CommandVerif.json`;
                let file = require(`../server/${message.guild.id}/CommandVerif.json`);
                file.ticket = false;
                fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(file));
                    console.log('writing to ' + fileName);
                    sleep(5000);
                    console.log(`${args[0]} => false`);
                    let msg = message.channel.send(`${args[0]} is now disable !`);
                    msg.then((m) => {
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, 10000);
                    });
                });
            }
        }
        else{
            let msg = message.channel.send("Impossible de trouver cet argument ! Essayer '.sw (le nom de la commande)'");
            msg.then((m) => {
                setTimeout(() => {
                    message.delete();
                    m.delete();
                }, 5000);
            });
        }
    }
}