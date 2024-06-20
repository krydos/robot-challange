const readlines = require('n-readlines');
const prompt = require('prompt-sync')()

import { Robot } from './robot';
import { Table } from './table';
import { parseCommand } from './commands';
import { ICommand } from './commands';

export class Runner {
    interactive() {
        console.log('Use Ctrl+c to exit...')
        this.run(() => prompt('> '))
    }

    from_file(filepath: string) {
        const command_stream = this.create_command_stream(filepath)
        this.run(() => {
            const buffer = command_stream.next();
            if (buffer) {
                return buffer.toString('ascii')
            }
        })
    }

    run(getInputFunc: Function) {
        const robot = new Robot()
        const table = {
            x: 5,
            y: 5,
        }
        let line = null;
        while (line = getInputFunc()) {
            const command = parseCommand(line);
            if (! command) {
                continue;
            }

            if (! this.isValidMove(robot, table, command)) {
                console.log('Command is invalid.')
            } else {
                robot.execute(command)
            }
        }
    }

    isValidMove(robot: Robot, table: Table, command: ICommand) {
        if (! command.mutable) {
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

    create_command_stream(filepath: string) {
        return new readlines(filepath)
    }
}
