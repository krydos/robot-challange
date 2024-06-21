import { Command, ValidDirection } from "./common";
import { RobotState } from "../robot";

export class LeftCommand extends Command {
    mutable = true;
    static signature = 'left';
    run(state: RobotState): RobotState {
        if (state.direction == ValidDirection.NORTH) return { ...state, ...{ direction: ValidDirection.WEST } }
        if (state.direction == ValidDirection.WEST) return { ...state, ... { direction: ValidDirection.SOUTH } }
        if (state.direction == ValidDirection.SOUTH) return { ...state, ...{ direction: ValidDirection.EAST } }
        if (state.direction == ValidDirection.EAST) return { ...state, ... { direction: ValidDirection.NORTH } }

        return state;
    }
}