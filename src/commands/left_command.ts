import { Command } from "./common";
import { RobotState } from "../robot";

export class LeftCommand extends Command {
    mutable = true;
    static signature = 'left';
    run(state: RobotState): RobotState {
        if (state.direction == 'NORTH') return { ...state, ...{ direction: 'WEST' } }
        if (state.direction == 'WEST') return { ...state, ... { direction: 'SOUTH' } }
        if (state.direction == 'SOUTH') return { ...state, ...{ direction: 'EAST' } }
        if (state.direction == 'EAST') return { ...state, ... { direction: 'NORTH' } }

        return state;
    }
}