const readlines = require('n-readlines');
const prompt = require('prompt-sync')()

import { Robot } from './robot';
import { Table } from './table';
import { parseCommand } from './commands';
import { ICommand } from './commands';

export class RunMode {
    static interactive() {
        console.log('Use Ctrl+c to exit...')
        RunMode.run(() => prompt('> '))
    }

    static from_file(filepath: string) {
        const command_stream = RunMode.create_command_stream(filepath)
        RunMode.run(() => {
            const buffer = command_stream.next();
            if (buffer) {
                return buffer.toString('ascii')
            }
        })
    }

    static isValidMove(robot: Robot, table: Table, command: ICommand) {
        if (command.constructor.name == 'ReportCommand') {
            return true;
        }
        const newState = {...robot.getState(), ...command.run(robot.getState())}
        if (newState.x > table.x || newState.x < 0) {
            return false
        }
        if (newState.y > table.y || newState.y < 0) {
            return false
        }
        return true;
    }

    static run(get_input_func: Function) {
        const robot = new Robot()
        const table = {
            x: 5,
            y: 5,
        }
        let line = null;
        while (line = get_input_func()) {
            const command = parseCommand(line);
            if (! command) {
                continue;
            }

            if (! RunMode.isValidMove(robot, table, command)) {
                console.log('Command is invalid.')
            } else {
                robot.execute(command)
            }
        }
    }

    static create_command_stream(filepath: string) {
        return new readlines(filepath)
    }
}
