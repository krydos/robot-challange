import { RobotState } from "../robot"

export enum ValidDirection {
    NORTH = 'NORTH',
    SOUTH = 'SOUTH',
    WEST = 'WEST',
    EAST = 'EAST',
}

export function isValidDirection(direction: string): boolean {
    return Object.values(ValidDirection).includes(direction as ValidDirection);
}

export class InvalidCommandArguments extends Error {}

export abstract class Command {
    static signature: string;
    private output: Array<string> = []
    protected args: Array<any> = []

    constructor(args: Array<any>) {
        this.args = args
        if (! this.hasValidArguments()) {
            throw new InvalidCommandArguments('Invalid command arguments.')
        }
    }

    // Main method of a command.
    // Try your best to write it without any side effects.
    abstract run(state: RobotState): RobotState;

    // Each command must be responsible for validating its own arguments.
    // Override this one if you need validation.
    protected hasValidArguments(): boolean {
        return true;
    }

    // It's not job of the command to decide how to output anything.
    // Use this method to add any output from the command.
    // It will be handled by the rest of the system.
    protected addOutput(output: string) {
        this.output.push(output)
    }

    getOutput() {
        return this.output
    }
}