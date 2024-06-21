const readlines = require('n-readlines');
const prompt = require('prompt-sync')()

import { Robot, RobotState } from './robot';
import { Board } from './board';
import { ParseCommand } from './commands/parser';
import { ConsoleOutputHandler, IOutputHandler } from './output_handler';
import { IMoveValidator } from './validators/common';
import { SimpleMoveValidator } from './validators/simple_move_validator';

export type RunnerConfig = {
    robot?: Robot,
    board?: Board,
    outputHandler?: IOutputHandler
    moveValidator?: IMoveValidator
}

export class Runner {
    robot: Robot;
    board: Board;
    outputHandler: IOutputHandler;
    moveValidator: IMoveValidator;

    constructor(config?: RunnerConfig) {
        this.outputHandler = config?.outputHandler || new ConsoleOutputHandler()
        this.robot = config?.robot || new Robot()
        this.board = config?.board || {x: 1, y: 1}
        this.moveValidator = config?.moveValidator || new SimpleMoveValidator();
    }
    interactive() {
        this.outputHandler.write('Use Ctrl+c to exit...')
        this.run(() => prompt('> '))
    }

    fromFile(filepath: string) {
        const command_stream = new readlines(filepath)
        this.run(() => {
            const line = command_stream.next()
            if (line) {
                return line.toString('ascii')
            }
            return null
        })
    }

    // Main method to run commands.
    // getInputFunc is going to return a command per call
    run(getInputFunc: Function) {
        while (true) {
            const inputLine = getInputFunc()
            if (typeof inputLine !== 'string' && ! inputLine) {
                break;
            }

            const command = ParseCommand(inputLine);

            // 1. execute the command and get new robot state
            const newState = command.run(this.robot.getState());

            // 2. validate the new state
            if (! this.moveValidator.isMoveValid(this.robot.getState(), newState, this.board)) {
                continue; // don't even tell user that the input is invalid. Just ignore.
            }

            // 3. set the new state and show the command output if any
            this.robot.setState(newState)
            for (const out of command.getOutput()) {
                this.outputHandler.write(out)
            }
        }
    }
}
