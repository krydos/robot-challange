import { Command } from "./base_command";
import { RobotState } from "../robot";
import { rotate } from "./utils";

export class LeftCommand extends Command {
    static signature = 'left';
    run(state: RobotState): RobotState {
        return { ...state, ...{ direction: rotate(state.direction) }};
    }
}