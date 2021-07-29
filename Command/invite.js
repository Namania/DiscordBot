const config = require('../config.json');

module.exports = {
    name: "invite",
    description: "invite bot",
    execute(message) {
        message.channel.send(config.InviteURL);
    }
}