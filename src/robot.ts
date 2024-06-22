import { ValidDirection } from "./commands/utils";

export type RobotState = {
    x: number,
    y: number,
    direction: ValidDirection | undefined,
    isPlaced: boolean,
}

export interface StateFullRobot {
    getState(): RobotState
    setState(state: RobotState): void
}

export class SimpleRobot implements StateFullRobot {
    private state: RobotState;
    constructor() {
        this.state = { x: 0, y: 0, direction: undefined, isPlaced: false }
    }

    getState() {
        return this.state;
    }

    setState(state: RobotState) {
        this.state = state;
    }
}