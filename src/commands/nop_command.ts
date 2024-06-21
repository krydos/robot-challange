import { Command } from "./common";
import { RobotState } from "../robot";

export class NopCommand extends Command {
    mutable = true;
    static signature = '';
    constructor(
        private args: any
    ) { super() }


    run(state: RobotState): RobotState {
        return state;
    }
}