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

    return enumValues[(currentDirectionIndex + modifier) % enumValues.length]
}

