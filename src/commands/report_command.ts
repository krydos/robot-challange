import { Command } from "./base_command";
import { RobotState } from "../robot";

export class ReportCommand extends Command {
    static signature = 'report';
    run(state: RobotState): RobotState {
        this.addOutput(`${state.x},${state.y},${state.direction}`);
        return state
    }
}