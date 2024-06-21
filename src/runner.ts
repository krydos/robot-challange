const readlines = require('n-readlines');
const prompt = require('prompt-sync')()

import { Robot, RobotState } from './robot';
import { Table } from './table';
import { ParseCommand } from './commands/parser';
import { ConsoleOutputHandler, IOutputHandler } from './output_handler';
import { IMoveValidator } from './validators/common';
import { SimpleMoveValidator } from './validators/simple_move_validator';

export type RunnerConfig = {
    robot?: Robot,
    table?: Table,
    outputHandler?: IOutputHandler
    moveValidator?: IMoveValidator
}

export class Runner {
    robot: Robot;
    table: Table;
    outputHandler: IOutputHandler;
    moveValidator: IMoveValidator;

    constructor(config?: RunnerConfig) {
        this.outputHandler = config?.outputHandler || new ConsoleOutputHandler()
        this.robot = config?.robot || new Robot()
        this.table = config?.table || {x: 5, y: 5}
        this.moveValidator = config?.moveValidator || new SimpleMoveValidator();
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
        while (true) {
            const line = getInputFunc()

            if (line === undefined || line === null) {
                break;
            }

            const command = ParseCommand(line);

            if (command.constructor.name == 'NopCommand') {
                this.outputHandler.write('Unknown command. Nothing has been executed.')
            }

            if (! this.robot.canMove() && command.constructor.name !== 'PlaceCommand') {
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
                    command.flushOutput();
                }
            }
        }
    }
}
