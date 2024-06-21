import { Command } from "./common";
import { RobotState } from "../robot";

export class NopCommand extends Command {
    static signature = '';

    run(state: RobotState): RobotState {
        return state;
    }
}