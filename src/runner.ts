const readlines = require('n-readlines');
const prompt = require('prompt-sync')()

import { Robot, RobotState } from './robot';
import { Table } from './table';
import { ParseCommand } from './commands/parser';
import { IOutputHandler } from './output_handler';
import { IMoveValidator } from './validators/common';
import { SimpleMoveValidator } from './validators/simple_move_validator';

export class Runner {
    robot: Robot;
    table: Table;
    outputHandler: IOutputHandler;
    moveValidator: IMoveValidator;

    constructor(outputHandler: IOutputHandler, robot?: Robot, table?: Table, moveValidator?: IMoveValidator) {
        this.outputHandler = outputHandler
        this.robot = robot ? robot : new Robot()
        this.table = table ? table : {x: 5, y: 5}
        this.moveValidator = moveValidator ? moveValidator : new SimpleMoveValidator();
    }
    interactive() {
        this.outputHandler.write('Use Ctrl+c to exit...')
        this.run(() => prompt('> '))
    }

    fromFile(filepath: string) {
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
            if (! this.moveValidator.isMoveValid(this.robot.getState(), newState, this.table)) {
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
}
