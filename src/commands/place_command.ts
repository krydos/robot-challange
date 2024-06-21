import { Command } from "./common";
import { RobotState } from "../robot";

export class PlaceCommand extends Command {
    mutable = true;
    static signature = 'place';
    constructor(
        private args: any
    ) { super() }


    run(state: RobotState): RobotState {
        return {
            ...state,
            ...{
                x: parseInt(this.args[0]),
                y: parseInt(this.args[1]),
                direction: this.args[2].toUpperCase(),
                is_placed: true
            }
        }
    }
}