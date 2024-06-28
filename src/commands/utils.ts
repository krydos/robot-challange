import { Boundaries2D, Position } from "../board";

export class InvalidCommandArguments extends Error {}

export enum ValidDirection {
    NORTH = 'NORTH',
    EAST = 'EAST',
    SOUTH = 'SOUTH',
    WEST = 'WEST',
}

export function isValidDirection(direction: string): boolean {
    return Object.values(ValidDirection).includes(direction as ValidDirection);
}

// This one iterate over ValidDirection values and select the next one or previous one.
// Useful for commands that change a robot direction.
export function rotate(currentDirection: ValidDirection | undefined, clockwise = false): ValidDirection | undefined {
    const enumValues = Object.values(ValidDirection);
    const modifier = clockwise ? 1 : (enumValues.length - 1);
    const currentDirectionIndex = enumValues.findIndex(v => v == currentDirection);

    if (currentDirectionIndex === -1) {
        return;
    }

    return enumValues[(currentDirectionIndex + modifier) % enumValues.length];
}

export function bfs(root: Position, target: Position, board: Boundaries2D): Array<Position> {
    const visited: Array<Position> = []; // helps to keep queue variable free of duplicates
    const queue: Array<Position> = [root];
    const pathHolder: Map<string, Position> = new Map() // a map of paths from children to their parents
    const pathHolderKey = (position: Position) => `${position.x}:${position.y}`

    // go through the queue (there is always one Position in there)
    // break after we've found the target (it means that pathHolder already contains the valid path)
    while (queue.length > 0) {
        const current = queue.shift();
        if (current === undefined) continue; // this one is unlikely but TS complains otherwise
        visited.push(current)

        if (current.x === target.x && current.y === target.y) {
            break;
        }

        for (const child of board.getValidChildren(current)) {
            const itIsFound = visited.find(e => e.x === child.x && e.y === child.y);
            if (! itIsFound) {
                pathHolder.set(pathHolderKey(child), current)
                queue.push(child);
            }
        }
    }

    // it's now time to go over the pathHolder and traverse back
    // from the target to the root position.

    // this variable contain points from the target to the root position
    const result: Array<Position> = [target];
    let current = target;
    while (true) {
        const parent = pathHolder.get(pathHolderKey(current))
        if (parent === undefined) break; // this is unlikely
        result.push(parent)
        if (parent.x === root.x && parent.y === root.y) {
            break;
        }
        current = parent
    }

    return result;
};

