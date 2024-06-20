import { Command } from "./common";
import { RobotState } from "../robot";

export class MoveCommand extends Command {
    mutable = true;
    static signature = '^move$'
    constructor(
        private args: any
    ) { super() }
    run(state: RobotState): RobotState {
        if (state.face == 'NORTH') return { ...state, ...{ y: state.y + 1 } }
        if (state.face == 'SOUTH') return { ...state, ...{ y: state.y - 1 } }
        if (state.face == 'EAST') return { ...state, ...{ x: state.x + 1 } }
        if (state.face == 'WEST') return { ...state, ...{ x: state.x - 1 } }

        return state;
    }
}