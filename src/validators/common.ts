import { RobotState } from "../robot";
import { Boundaries2D } from "../board";

export interface MoveValidator2D {
    isMoveValid(currentState: RobotState, newState: RobotState, board: Boundaries2D): boolean
}