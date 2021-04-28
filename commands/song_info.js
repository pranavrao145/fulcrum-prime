module.exports = {
    name: "song_info",
    description: "Gives back the song info for the track name specified.",
    execute(message, args) {
        if (args.length === 0) {
            message.channel.send("Invalid syntax! Correct syntax: f!songinfo [track name] [artist (optional)]");
        }

        let track = args.shift().toLowerCase();
        let artist = args.shift().toLowerCase();

        if (track && artist) {
            
        }
    }
}
