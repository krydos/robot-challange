import { Command } from "./base_command";
import { RobotState } from "../robot";
import { rotate } from "./utils";

export class RightCommand extends Command {
    run(state: RobotState): RobotState {
        return { ...state, ...{ direction: rotate(state.direction, true) }};
    }
}