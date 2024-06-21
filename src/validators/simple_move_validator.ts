import { RobotState } from "../robot";
import { Table } from "../table";
import { IMoveValidator } from "./common";

export class SimpleMoveValidator implements IMoveValidator {
    isMoveValid(currentState: RobotState, newState: RobotState, table: Table): boolean {
        if (newState.x > table.x || newState.x < 0) {
            return false
        }
        if (newState.y > table.y || newState.y < 0) {
            return false
        }
        return true;
    }
}