const readlines = require('n-readlines');
const prompt = require('prompt-sync')()

import { Robot, RobotState } from './robot';
import { Table } from './table';
import { ParseCommand } from './commands/parser';
import { IOutputHandler } from './output_handler';

export class Runner {
    robot: Robot;
    table: Table;
    outputHandler: IOutputHandler;

    constructor(outputHandler: IOutputHandler, robot?: Robot, table?: Table) {
        this.outputHandler = outputHandler
        this.robot = robot ? robot : new Robot()
        this.table = table ? table : {x: 5, y: 5}
    }
    interactive() {
        this.outputHandler.write('Use Ctrl+c to exit...')
        this.run(() => prompt('> '))
    }

    from_file(filepath: string) {
        const command_stream = new readlines(filepath)
        this.run(() => {
            const buffer = command_stream.next();
            if (buffer) {
                return buffer.toString('ascii')
            }
        })
    }

    run(getInputFunc: Function) {
        let line = null;
        while (line = getInputFunc()) {
            const command = ParseCommand(line);
            if (! command) {
                continue;
            }

            const newState = command.run(this.robot.getState());
            if (! this.isValidMove(this.robot.getState(), newState, this.table)) {
                this.outputHandler.write('Command is invalid');
            } else {
                this.robot.setState(newState)
                if (command.hasOutput()) {
                    for (const out of command.getOutput()) {
                        this.outputHandler.write(out)
                    }
                }
            }
        }
    }

    isValidMove(currentState: RobotState, newState: RobotState, table: Table) {
        if (newState.x > table.x || newState.x < 0) {
            return false
        }
        if (newState.y > table.y || newState.y < 0) {
            return false
        }
        return true;
    }
}
