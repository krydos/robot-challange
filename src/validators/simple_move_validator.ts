import { RobotState } from "../robot";
import { Boundaries2D, Obstacle } from "../board";
import { MoveValidator2D } from "./common";

export class SimpleMoveValidator implements MoveValidator2D {
    isMoveValid(currentState: RobotState, newState: RobotState, board: Boundaries2D): boolean {
        if (! currentState.isPlaced && ! newState.isPlaced) {
            return false;
        }
        if (newState.x > board.getMaxX() || newState.x < board.getMinX()) {
            return false;
        }
        if (newState.y > board.getMaxY() || newState.y < board.getMinY()) {
            return false;
        }
        if (this.isOnObstacle(newState, board.getObstacles())) {
            return false;
        }

        return true;
    }

    private isOnObstacle(newState: RobotState, obstacles: Array<Obstacle>): boolean {
        for (const obstacle of obstacles) {
            if (obstacle.x == newState.x && obstacle.y == newState.y)  {
                return true;
            }
        }

        return false;
    }
}