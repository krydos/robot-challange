import { Command } from "./base_command";
import { RobotState } from "../robot";
import { ValidDirection } from "./utils";

export class MoveCommand extends Command {
    run(state: RobotState): RobotState {
        // We may have issue here if we need to handle more directions.
        if (state.direction == ValidDirection.NORTH) return { ...state, ...{ y: state.y + 1 } };
        if (state.direction == ValidDirection.SOUTH) return { ...state, ...{ y: state.y - 1 } };
        if (state.direction == ValidDirection.EAST) return { ...state, ...{ x: state.x + 1 } };
        if (state.direction == ValidDirection.WEST) return { ...state, ...{ x: state.x - 1 } };

        return state;
    }
}