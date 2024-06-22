import { Command } from "./base_command";
import { RobotState } from "../robot";

export class NopCommand extends Command {
    static signature = '';

    run(state: RobotState): RobotState {
        return state;
    }
}