import { RobotState } from "../robot";
import { Board } from "../board";
import { IMoveValidator } from "./common";

export class SimpleMoveValidator implements IMoveValidator {
    isMoveValid(currentState: RobotState, newState: RobotState, board: Board): boolean {
        if (! currentState.is_placed && ! newState.is_placed) {
            return false
        }
        if (newState.x > board.x || newState.x < 0) {
            return false
        }
        if (newState.y > board.y || newState.y < 0) {
            return false
        }
        return true;
    }
}