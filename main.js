let { prefix } = require('./config.json');
let config = require('./config.json');
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFilesC = fs.readdirSync('./Command/').filter(file => file.endsWith('.js'));

for (const file of commandFilesC) {
  const command = require(`./Command/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
    client.user.setStatus("dnd");
    client.user.setActivity("Help : '.help'", {type: 'WATCHING'});
    console.log(`Logged in as ${client.user.tag} !`);
    console.log(`ready !`);
});

client.on('message', function(message) {

    if (message.author.bot || message.channel.type === 'dm') return;
    
    let setup = require(`./server/${message.guild.id}/Setup.json`)

    if (message.member.roles.cache.has(setup.Muted)) {
        return message.delete();
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();

    if (!client.commands.has(command)) return;

    try {
        if (message.content.startsWith(prefix)) {
          client.commands.get(command).execute(message, args);
        }
    } catch (error) {
        console.error(error);
        let msg = message.reply("Une erreur s'est produite pendant l'execution de la commande !");
        msg.then((m) => {
            message.delete();
            setTimeout(() => {m.delete()}, 10000);
        });
    }

});

client.on('guildMemberAdd', function(member) {

    let guild = member.guild;

    let userId = member.id;
    let userName = member.user.username;
    let embed = new Discord.MessageEmbed()
        .setTitle('New Member')
        .setColor("#FFBC4D")
        .setDescription(`Bienvenu à toi ${userName} !`)
        .setImage(member.user.displayAvatarURL({ format: 'png'}))
    
    let channelToSend;

    guild.channels.cache.forEach((channel) => {
        if (channel.type === "text" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
            channelToSend = channel;
        }
    });

    if (!channelToSend) {
        return;
    }

    channelToSend.send(embed);

    let fileName = `./server/${guild.id}/config.json`;
    let file = require(`./server/${guild.id}/config.json`);
    file.member = member.guild.memberCount;
    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(file));
        console.log('writing to ' + fileName);
    });
    
});

client.on('guildMemberRemove', function(member) {

    let guild = member.guild;

    if (member.user.id === '861218421445492736') {return}

    let userId = member.id;
    let userName = member.user.username;
    let embed = new Discord.MessageEmbed()
        .setTitle('Lost Member')
        .setColor("#FFBC4D")
        .setDescription(`${userName} nous à quitter à tous jamais !`)
        .setImage(member.user.displayAvatarURL({ format: 'png'}))
    
    let channelToSend;

    guild.channels.cache.forEach((channel) => {
        if (channel.type === "text" && !channelToSend && channel.permissionsFor(guild.me).hasPermission("SEND_MESSAGES")) {
            channelToSend = channel;
        }
    });

    if (!channelToSend) {
        return;
    }

    channelToSend.send(embed);

    let fileName = `./server/${guild.id}/config.json`;
    let file = require(`./server/${guild.id}/config.json`);
    file.member = member.guild.memberCount;
    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(file));
        console.log('writing to ' + fileName);
    });

});

client.on('guildCreate', function(guild) {

    let guildId = guild.id;
    let guildName = guild.name;
    let guildMember = guild.memberCount;
    let ChannelM;
    let embed = new Discord.MessageEmbed()
        .setTitle(`${guildName}`)
        .setColor("#FFBC4D")
        .setDescription(`EN COURS D'INITIALISATON...`)    
    let channelToSend;

    guild.channels.cache.forEach((channel) => {
        if (channel.type === "text" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
            channelToSend = channel;
        }
    });

    if (!channelToSend) {
        return;
    }

    let msg = channelToSend.send(embed)
    msg.then((m) => {
        ChannelM = m; 
    });

    fs.mkdir(path.join(__dirname, `./server/${guildId}`), (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });

    fs.copyFile('./Default/config.json', `./server/${guildId}/config.json`, (err) => {
        if (err) return console.log(err);
        console.log(`./config.json was copied to ${guildId}`);
    });

    fs.copyFile('./Default/CommandVerif.json', `./server/${guildId}/CommandVerif.json`, (err) => {
        if (err) return console.log(err);
        console.log(`./CommandVerif.json was copied to ${guildId}`);
    });

    fs.copyFile('./Default/Setup.json', `./server/${guildId}/Setup.json`, (err) => {
        if (err) return console.log(err);
        console.log(`./Setup.json was copied to ${guildId}`);
    });

    setTimeout(() => {
        WriteGuildName();
        WriteGuildId();
        WriteGuildMember();
        CreateRoleMuted();
        fs.mkdir(path.join(__dirname, `./server/${guildId}/ticket`), (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });
        ChannelM.delete().then(() => {
            let embed2 = new Discord.MessageEmbed()
                .setTitle(`${guildName}`)
                .setColor("#FFBC4D")
                .setDescription(`PRÊT À L'EMPLOI !`)
                .setTimestamp()
                .setFooter('Fizycol_Namania', 'https://cdn.discordapp.com/avatars/516313531721973760/cd608ae504eefebc0a2fa4c0dc1e9da5.png')
            channelToSend.send(embed2);
        });
    }, 5000);

    function CreateRoleMuted() {
        guild.roles.create({
            data: {
                name: "Muted",
                color: "#ff0000",
            }
        }).then((r) => {
            let Role = channelToSend.guild.roles.cache.find(role => role.name === 'Muted');
            Role.setPermissions([]);
            let fileName = `./server/${guildId}/Setup.json`;
            let file = require(`./server/${guildId}/Setup.json`);
            file.Muted = Role.id;
            fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
                if (err) return console.log(err);
                console.log(JSON.stringify(file));
                console.log('writing to ' + fileName);
            });
        });
    }
    function WriteGuildName() {
        let fileName = `./server/${guildId}/config.json`;
        let file = require(`./server/${guildId}/config.json`);
        file.name = guildName;
        fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(file));
            console.log('writing to ' + fileName);
        });
    }
    function WriteGuildId() {
        let fileName = `./server/${guildId}/config.json`;
        let file = require(`./server/${guildId}/config.json`);
        file.id = guildId;
        fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
            if (err) return console.log(err);
        });
    }
    function WriteGuildMember() {
        let fileName = `./server/${guildId}/config.json`;
        let file = require(`./server/${guildId}/config.json`);
        let { member } = require(`./server/${guildId}/config.json`);
        file.member = member + guildMember;
        fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
            if (err) return console.log(err);
        });
    }
    
});

client.on('guildDelete', function(guild) {

    let guildId = guild.id;

    fs.rm(`./server/${guildId}`, { recursive: true, force: true }, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory deleted successfully!');
    });

});

client.login(config.token);