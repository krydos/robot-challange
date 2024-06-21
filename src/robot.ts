import { Command, ValidDirection } from "./commands/common";

export type RobotState = {
    x: number,
    y: number,
    direction: ValidDirection | undefined,
    is_placed: boolean,
}

export class Robot {
    private state: RobotState;
    constructor() {
        this.state = { x: 0, y: 0, direction: undefined, is_placed: false }
    }

    getState() {
        return this.state;
    }

    setState(state: RobotState) {
        this.state = state
    }

    canMove() {
        return this.state.is_placed
    }
}