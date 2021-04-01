module.exports = {
    name: "random_number",
    alias: ["rn"],
    description: "Provide a random number within the specified range.",
    execute(msg, args) {
        var starting_num, ending_num;

        if (args.length < 2) {
            msg.reply("invalid syntax. Correct syntax: f!randomnumber {number_start_of_range} {number_end_of_range}")
            return;
        } else {
            starting_num = Math.ceil(args[0]);
            ending_num = Math.floor(args[1]);

            if (isNaN(starting_num) || isNaN(ending_num)) {
                msg.reply("invalid syntax. Correct syntax: f!randomnumber {number_start_of_range} {number_end_of_range}")
                return;
            }

            const random_num = Math.floor((Math.random() * ending_num) + starting_num);

            msg.reply("here is your random number from " + starting_num + " to " + ending_num + ": " + random_num);
        }
    }
}
