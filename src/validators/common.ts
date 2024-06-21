import { RobotState } from "../robot";
import { Table } from "../table";

export interface IMoveValidator {
    isMoveValid(currentState: RobotState, newState: RobotState, table: Table): boolean
}