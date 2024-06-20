const readlines = require('n-readlines');
const prompt = require('prompt-sync')()

const Robot = require('./src/robot').Robot;
const parseCommand = require('./src/commands').parseCommand;



// TODO show usage
// TODO show unknown command error in interactive mode
// TODO commands should be case insensitive
// TODO validate commands input
// TODO validate robot movements
// TODO convert to ES6 modules
// TODO get rid of test/data folder


// ignore binary and the script names
const args = process.argv.slice(2);

function create_command_stream(filepath) {
    return new readlines(filepath)
}

function run_in_script_mode(filepath) {
    const command_steam = create_command_stream(filepath)
    const robot = new Robot()
    while (line = command_steam.next()) {
        const command = parseCommand(line.toString('ascii'));
        robot.execute(command)
    }
}

function run_interactively() {
    const robot = new Robot()
    console.log('Use Ctrl+c to exit...')
    while (line = prompt('> ')) {
        const command = parseCommand(line);
        robot.execute(command)
        console.log(robot)
    }
}


if (args.length > 0) {
    run_in_script_mode(args[0])
} else {
    run_interactively()
}

