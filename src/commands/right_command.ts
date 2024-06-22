import { Command } from "./base_command";
import { RobotState } from "../robot";
import { rotate } from "./utils";

export class RightCommand extends Command {
    static signature = 'right'
    run(state: RobotState): RobotState {
        return { ...state, ...{ direction: rotate(state.direction, true) }};
    }
}