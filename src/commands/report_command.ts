import { Command } from "./common";
import { RobotState } from "../robot";

export class ReportCommand extends Command {
    mutable = false;
    static signature = '^report$';
    constructor(
        private args: any
    ) { super() }
    run(state: RobotState): RobotState {
        console.log(`${state.x},${state.y},${state.face}`)
        return state
    }
}