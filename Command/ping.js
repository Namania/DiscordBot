const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Test commande',
    /**
     * 
     * @param {Discord.Message} message 
     */
    async execute(message) {
        let msg = await message.reply('Pinging...');
        message.delete();
        msg.edit(`<@${message.author.id}>, Your ping is : **${Math.floor(msg.createdAt - message.createdAt)}ms**`).then((m) => {
            setTimeout(() => {
                m.delete();
            }, 5000);
        });
    }
}