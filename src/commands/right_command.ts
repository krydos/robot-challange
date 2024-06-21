import { Command } from "./common";
import { RobotState } from "../robot";

export class RightCommand extends Command {
    mutable = true;
    static signature = 'right'
    constructor(
        private args: any
    ) { super() }
    run(state: RobotState): RobotState {
        if (state.direction == 'NORTH') return { ...state, ...{ direction: 'EAST' } }
        if (state.direction == 'EAST') return { ...state, ...{ direction: 'SOUTH' } }
        if (state.direction == 'SOUTH') return { ...state, ...{ direction: 'WEST' } }
        if (state.direction == 'WEST') return { ...state, ...{ direction: 'NORTH' } }

        return state
    }
}