import { ICommand, ValidDirection } from "./commands";

export type RobotState = {
    x: number,
    y: number,
    face: ValidDirection,
    is_placed: boolean,
}

export class Robot {
    private state: RobotState;
    constructor() {
        this.state = { x: 0, y: 0, face: 'NORTH', is_placed: false }
    }

    getX() {
        return this.state.x;
    }

    getY() {
        return this.state.y;
    }

    getFace() {
        return this.state.face;
    }

    isPlaced() {
        return this.state.is_placed;
    }

    getState() {
        return this.state;
    }

    execute(command: ICommand) {
        const newState = command.run(this.getState());
        console.log(newState)
        this.state = newState;
    }
}