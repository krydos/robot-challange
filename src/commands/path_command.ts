import { Command } from "./base_command";
import { RobotState } from "../robot";
import { Boundaries2D, Position } from "../board";
import { bfs } from "./utils";

export class PathCommand extends Command {
    run(state: RobotState, board: Boundaries2D): RobotState {
        const path = this.recordPath(state, board);

        for (const position of path) {
            this.addOutput(`${position.x},${position.y}`)
        }

        return state;
    }

    protected recordPath(state: RobotState, board: Boundaries2D) {
        const currentPosition = new Position(state.x, state.y);
        const target = new Position(parseInt(this.args[0]), parseInt(this.args[1]));

        if (! board.isPositionAvailableToMove(target)) {
            return []
        }

        return bfs(
            currentPosition,
            target,
            board
        );
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
        return true;
    }
}