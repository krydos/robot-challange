import { RobotState } from "../robot"

const VALID_DIRECTIONS = ['NORTH', 'SOUTH', 'WEST', 'EAST'] as const;
export type ValidDirection = typeof VALID_DIRECTIONS[number];
export function isValidDirection(direction: string): boolean {
    return VALID_DIRECTIONS.includes(direction as ValidDirection);
}

export class InvalidCommandArguments extends Error {}

export abstract class Command {
    abstract mutable: boolean;
    static signature: string;
    private output: Array<string> = []
    protected args: Array<any> = []

    constructor(args: Array<any>) {
        this.args = args
        if (! this.hasValidArguments()) {
            throw new InvalidCommandArguments('Invalid command arguments.')
        }
    }

    abstract run(state: RobotState): RobotState;
    protected hasValidArguments(): boolean {
        return true;
    }
    protected addOutput(output: string) {
        this.output.push(output)
    }
    hasOutput() {
        return !! this.output.length;
    }
    getOutput() {
        return this.output
    }
    flushOutput(): void {
        this.output = []
    }

}