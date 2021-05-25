module.exports = {
    name: "leave_voice",
    description: "Allows a user to leave a voice channel through a command.",
    execute(message) {
        message.member.voice.setChannel(null)
            .then(() => console.log("User removed from voice channel successfully."))
            .catch();
    }
}
