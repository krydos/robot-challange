export class InvalidBoardBoundaries extends Error {}

export interface Boundaries2D {
    getMinX(): number
    getMaxX(): number
    getMinY(): number
    getMaxY(): number
    getObstacles(): Array<Obstacle>
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
        private obstacles: Array<Obstacle> = []
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
}