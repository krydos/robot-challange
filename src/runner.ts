const readlines = require('n-readlines');
const prompt = require('prompt-sync')()

import { StateFullRobot } from './robot';
import { Boundaries2D } from './board';
import { MoveValidator2D } from './validators/common';
import { OutputHandler } from './output_handler';
import { ParseCommand } from './parsers/base_parser';

export type RunnerConfig = {
    robot: StateFullRobot,
    board: Boundaries2D,
    outputHandler: OutputHandler
    moveValidator: MoveValidator2D
    commandParser: ParseCommand,
}

export class Runner {
    constructor(private config: RunnerConfig) {}

    interactive() {
        this.config.outputHandler.write('Use Ctrl+C to exit...');
        this.run(() => prompt('> '));
    }

    fromFile(filepath: string) {
        const commandStream = new readlines(filepath);
        this.run(() => {
            const line = commandStream.next();
            if (line) {
                return line.toString('ascii');
            }
            return null;
        })
    }

    // Main method to run commands.
    // getInputFunc is going to return a command per call
    run(getInputFunc: Function) {
        this.config.board.setValidator(this.config.moveValidator);
        while (true) {
            const inputLine = getInputFunc();

            // empty strings should not break the loop
            if (typeof inputLine !== 'string' && ! inputLine) {
                break;
            }

            const command = this.config.commandParser.parseCommand(inputLine);

            // 1. execute the command and get new robot state
            const newState = command.run(this.config.robot.getState(), this.config.board);

            // 2. validate the new state
            if (! this.config.moveValidator.isMoveValid(this.config.robot.getState(), newState, this.config.board)) {
                continue; // don't even tell user that the input is invalid. Just ignore.
            }

            // 3. set the new state and show the command output if any
            this.config.robot.setState(newState);
            for (const out of command.getOutput()) {
                this.config.outputHandler.write(out);
            }
        }
    }
}
