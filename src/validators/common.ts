import { RobotState } from "../robot";
import { Board } from "../board";

export interface IMoveValidator {
    isMoveValid(currentState: RobotState, newState: RobotState, board: Board): boolean
}