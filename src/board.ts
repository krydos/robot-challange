export interface Boundaries2D {
    getMinX(): number
    getMaxX(): number
    getMinY(): number
    getMaxY(): number
}

export class SimpleBoard implements Boundaries2D {
    constructor(
        private x: number,
        private y: number,
    ) {}

    getMinX() { return 0; }
    getMinY() { return 0; }
    getMaxX() { return this.x; }
    getMaxY() { return this.y; }
}