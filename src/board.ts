import { MoveValidator2D } from "./validators/common"

export class InvalidBoardBoundaries extends Error {}

export interface Boundaries2D {
    getMinX(): number
    getMaxX(): number
    getMinY(): number
    getMaxY(): number
    getObstacles(): Array<Obstacle>,
    getValidChildren(position: Position): Array<Position>,
    isPositionAvailableToMove(position: Position): boolean,
    setValidator(validator: MoveValidator2D): void
}

export class Position {
    constructor(
        public x: number,
        public y: number,
    ) {}
}

export class Obstacle {
    constructor(
        public x: number,
        public y: number,
    ) {}
}

export class SimpleBoard implements Boundaries2D {
    constructor(
        private colsCount: number, // x
        private rowsCount: number, // y
        private obstacles: Array<Obstacle> = [],
        private validator: MoveValidator2D | undefined = undefined
    ) {
        if (! this.hasValidDimensions()) {
            throw new InvalidBoardBoundaries();
        }
    }

    private hasValidDimensions() {
        return (
            this.colsCount >= 0
            && this.rowsCount >= 0
            && Number.isInteger(this.colsCount)
            && Number.isInteger(this.rowsCount)
        );
    }

    getMinX() { return 0; }
    getMinY() { return 0; }
    getMaxX() { return this.colsCount; }
    getMaxY() { return this.rowsCount; }

    getObstacles() {
        return this.obstacles
    }

    getValidChildren(position: Position): Array<Position> {
        const children = [
            new Position(position.x, position.y + 1),
            new Position(position.x + 1, position.y),
            new Position(position.x, position.y - 1),
            new Position(position.x - 1, position.y)
        ];

        return children.filter(p => this.isPositionAvailableToMove(p))
    }

    isPositionAvailableToMove(position: Position): boolean {
        // everything is valid with no validation
        if (this.validator === undefined) {
            return true;
        }
        const state = {
            x: position.x,
            y: position.y,
            isPlaced: true,
            direction: undefined,
        }

        return this.validator.isMoveValid(state, state, this)
    }

    setValidator(validator: MoveValidator2D): void {
        this.validator = validator
    }
}