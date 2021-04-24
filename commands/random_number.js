module.exports = {
    name: "random_number",
    alias: ["rn"],
    description: "Provide a random number within the specified range.",
    execute(message, args) {
        var starting_num, ending_num;

        if (args.length < 2) {
            message.channel.send("Invalid syntax. Correct syntax: f!randomnumber [number start of range] [number end of range]")
            return;
        } else {
            starting_num = Math.ceil(args[0]);
            ending_num = Math.floor(args[1]);

            if (isNaN(starting_num) || isNaN(ending_num)) {
                message.channel.send("Invalid syntax. Correct syntax: f!randomnumber [number start of range] [number end of range]")
                return;
            }

            const random_num = Math.floor((Math.random() * ending_num) + starting_num);

            message.channel.send("here is your random number from " + starting_num + " to " + ending_num + ": " + random_num);
        }
    }
}
