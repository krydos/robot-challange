const readlines = require('n-readlines');
const prompt = require('prompt-sync')()

const Robot = require('./robot').Robot;
const parseCommand = require('./commands').parseCommand;

class RunMode {
    static interactive() {
        const robot = new Robot()
        console.log('Use Ctrl+c to exit...')
        let line = null;
        while (line = prompt('> ')) {
            const command = parseCommand(line);
            robot.execute(command)
            console.log(robot)
        }
    }
    static from_file(filepath) {
        const command_stream = RunMode.create_command_stream(filepath)
        const robot = new Robot()
        let line = null;
        while (line = command_stream.next()) {
            const command = parseCommand(line.toString('ascii'));
            robot.execute(command)
        }
    }

    static create_command_stream(filepath) {
        return new readlines(filepath)
    }
}

module.exports.RunMode = RunMode