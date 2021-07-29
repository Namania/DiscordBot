const Discord = require('discord.js');

module.exports = {
  name: 'cl',
  description: 'Delete messages.',
  /**
   * @param {Discord.Message} message 
   */
  execute(message, args) {

    let config = require("../config.json");
    let { clear } = require(`../server/${message.guild.id}/CommandVerif.json`);
    if (clear === false) return message.reply(config.MsgDisable);
    const amount = parseInt(args[0]) + 1;

    if (message.member.hasPermission('ADMINISTRATOR')) {
      let msg = message.channel.send(config.MsgErrorPermissions);
      msg.then((m) => {
        message.delete();
        setTimeout(() => {
          m.delete();
        }, 5000);
      });
      return;
    }

    if (message.author.id === config.IdNamania) {
      if (isNaN(amount)) {
        return message.reply("Ce n'est pas un nombre valide !");
      }
      else if (amount <= 1 || amount > 100) {
        return message.reply("Tu dois saisir un nombre compris entre 1 et 99 !");
      }

      else {
          message.channel.bulkDelete(amount)
          .then(messages => console.log(`${messages.size - 1} messages supprimés.`))
        }
    }
    else {
      message.channel.send(config.MsgErrorPermissions);
    }
  }
};