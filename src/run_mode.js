const readlines = require('n-readlines');
const prompt = require('prompt-sync')()

const Robot = require('./robot').Robot;
const parseCommand = require('./commands').parseCommand;

class RunMode {
    static interactive() {
        console.log('Use Ctrl+c to exit...')
        RunMode.run(() => prompt('> '))
    }

    static from_file(filepath) {
        const command_stream = RunMode.create_command_stream(filepath)
        RunMode.run(() => {
            const buffer = command_stream.next();
            if (buffer) {
                return buffer.toString('ascii')
            }
        })
    }

    static run(get_input_func) {
        const robot = new Robot()
        let line = null;
        while (line = get_input_func()) {
            const command = parseCommand(line);
            if (command) {
                robot.execute(command)
            }
        }
    }

    static create_command_stream(filepath) {
        return new readlines(filepath)
    }
}

module.exports.RunMode = RunMode