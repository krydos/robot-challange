import { Command, ValidDirection } from "./commands/common";

export type RobotState = {
    x: number,
    y: number,
    direction: ValidDirection,
    is_placed: boolean,
}

export class Robot {
    private state: RobotState;
    constructor() {
        this.state = { x: 0, y: 0, direction: 'NORTH', is_placed: false }
    }

    getState() {
        return this.state;
    }

    execute(command: Command) {
        this.state = command.run(this.getState());
    }
}