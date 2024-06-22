import { Command } from "./base_command";
import { RobotState } from "../robot";
import { isValidDirection } from "./utils";

export class PlaceCommand extends Command {
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
        // first two args are proper numbers
        if (
            this.args[0] === undefined
            || this.args[1] === undefined
            || isNaN(parseInt(this.args[0]))
            || isNaN(parseInt(this.args[1]))
        ) {
            return false;
        }
        // direction is ValidDirection
        if (this.args[2] === undefined || ! isValidDirection(this.args[2].toUpperCase())) {
            return false;
        }

        return true;
    }
}