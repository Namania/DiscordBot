module.exports = {
    name: "r",
    execute(message) {
        let Role = message.guild.roles.cache.find(role => role.name === 'Muted');
        Role.delete();
        let msg = message.channel.send("Le role à été supprimé avec succès !")
        msg.then((m) => {
            message.delete();
            setTimeout(() => {
                m.delete();
            }, 5000);
        });
    }
}