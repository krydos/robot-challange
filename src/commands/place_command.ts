import { Command, isValidDirection } from "./common";
import { RobotState } from "../robot";

export class PlaceCommand extends Command {
    mutable = true;
    static signature = 'place';

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

    protected hasValidArguments(): boolean {
        if (
            this.args[0] === undefined
            || this.args[1] === undefined
            || isNaN(parseInt(this.args[0]))
            || isNaN(parseInt(this.args[1]))
        ) {
            return false;
        }
        if (this.args[2] === undefined || ! isValidDirection(this.args[2].toUpperCase())) {
            return false;
        }

        return true;
    }
}