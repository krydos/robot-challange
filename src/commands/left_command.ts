import { Command } from "./common";
import { RobotState } from "../robot";

export class LeftCommand extends Command {
    mutable = true;
    static signature = '^left$';
    constructor(
        private args: any
    ) { super() }
    run(state: RobotState): RobotState {
        if (state.face == 'NORTH') return { ...state, ...{ face: 'WEST' } }
        if (state.face == 'WEST') return { ...state, ... { face: 'SOUTH' } }
        if (state.face == 'SOUTH') return { ...state, ...{ face: 'EAST' } }
        if (state.face == 'EAST') return { ...state, ... { face: 'NORTH' } }

        return state;
    }
}