import { Command } from "./common";
import { RobotState } from "../robot";

export class MoveCommand extends Command {
    mutable = true;
    static signature = 'move'
    run(state: RobotState): RobotState {
        if (state.direction == 'NORTH') return { ...state, ...{ y: state.y + 1 } }
        if (state.direction == 'SOUTH') return { ...state, ...{ y: state.y - 1 } }
        if (state.direction == 'EAST') return { ...state, ...{ x: state.x + 1 } }
        if (state.direction == 'WEST') return { ...state, ...{ x: state.x - 1 } }

        return state;
    }
}