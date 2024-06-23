import { LeftCommand } from "../src/commands/left_command"
import { MoveCommand } from "../src/commands/move_command";
import { NopCommand } from "../src/commands/nop_command";
import { PlaceCommand } from "../src/commands/place_command";
import { ReportCommand } from "../src/commands/report_command";
import { RightCommand } from "../src/commands/right_command";
import { InvalidCommandArguments, ValidDirection } from "../src/commands/utils";
import { RobotState } from "../src/robot";

const defaultState: RobotState = {
    x: 0,
    y: 0,
    direction: ValidDirection.NORTH,
    isPlaced: true,
}

describe('Test commands', () => {
    it('LEFT changes direction counterclockwise', () => {
        const command = new LeftCommand([]);
        expect(command.run(defaultState).direction).toBe(ValidDirection.WEST)
    })
    it('RIGHT changes direction clockwise', () => {
        const command = new RightCommand([]);
        expect(command.run(defaultState).direction).toBe(ValidDirection.EAST)
    })
    it('PLACE changes coordinates and direction', () => {
        const command = new PlaceCommand(['1', '2', 'SOUTH']);
        expect(command.run(defaultState)).toMatchObject({
            x: 1,
            y: 2,
            direction: ValidDirection.SOUTH,
        })
    })
    it('PLACE command throws exception in case of invalid arguments', () => {
        expect(() => new PlaceCommand(['1', '2', 'UP'])).toThrow(InvalidCommandArguments);
        expect(() => new PlaceCommand(['1', 'A', 'WEST'])).toThrow(InvalidCommandArguments);
        expect(() => new PlaceCommand(['A', '2', 'WEST'])).toThrow(InvalidCommandArguments);
        expect(() => new PlaceCommand([])).toThrow(InvalidCommandArguments)

        // Attention: it must not throw if there are too many arguments.
        // Every possible argument from a command expression is sent to a command
        // and command can choose what to do with it.
        // At this moment PlaceCommand doesn't throw an error in this case
        // because it seems reasonable to me (ruslan)
        expect(() => new PlaceCommand(['1', '2', 'WEST', 'UNUSED'])).not.toThrow(InvalidCommandArguments)
    })
    it('MOVE changes coordinates', () => {
        const command = new MoveCommand([]);
        expect(command.run({...defaultState, ...{ direction: ValidDirection.NORTH }}).y).toBe(1)
        expect(command.run({...defaultState, ...{ direction: ValidDirection.SOUTH }}).y).toBe(-1)
        expect(command.run({...defaultState, ...{ direction: ValidDirection.EAST }}).x).toBe(1)
        expect(command.run({...defaultState, ...{ direction: ValidDirection.WEST }}).x).toBe(-1)
    })
    it('NOP does not alter the state', () => {
        const command = new NopCommand([]);
        expect(command.run(defaultState)).toBe(defaultState)
    })
    it('REPORT does not alter the state', () => {
        const command = new ReportCommand([]);
        expect(command.run(defaultState)).toBe(defaultState)
    })
})