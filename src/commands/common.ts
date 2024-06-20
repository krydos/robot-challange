import { RobotState } from "../robot"

export type ValidDirection = 'NORTH' | 'SOUTH' | 'WEST' | 'EAST';

export abstract class Command {
    abstract mutable: boolean;
    static signature: string;
    abstract run(state: RobotState): RobotState;
}