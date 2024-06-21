import { RobotState } from "../robot"

export type ValidDirection = 'NORTH' | 'SOUTH' | 'WEST' | 'EAST';

export abstract class Command {
    abstract mutable: boolean;
    static signature: string;
    private output: Array<string> = []
    abstract run(state: RobotState): RobotState;
    protected addOutput(output: string) {
        this.output.push(output)
    }
    hasOutput() {
        return !! this.output.length;
    }
    getOutput() {
        return this.output
    }
}