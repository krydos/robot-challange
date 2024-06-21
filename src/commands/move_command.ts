import { Command, ValidDirection } from "./common";
import { RobotState } from "../robot";

export class MoveCommand extends Command {
    static signature = 'move'
    run(state: RobotState): RobotState {
        if (state.direction == ValidDirection.NORTH) return { ...state, ...{ y: state.y + 1 } }
        if (state.direction == ValidDirection.SOUTH) return { ...state, ...{ y: state.y - 1 } }
        if (state.direction == ValidDirection.EAST) return { ...state, ...{ x: state.x + 1 } }
        if (state.direction == ValidDirection.WEST) return { ...state, ...{ x: state.x - 1 } }

        return state;
    }
}