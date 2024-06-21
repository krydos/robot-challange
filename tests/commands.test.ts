import { InvalidCommandArguments, ValidDirection } from "../src/commands/common";
import { LeftCommand } from "../src/commands/left_command"
import { MoveCommand } from "../src/commands/move_command";
import { NopCommand } from "../src/commands/nop_command";
import { PlaceCommand } from "../src/commands/place_command";
import { ReportCommand } from "../src/commands/report_command";
import { RightCommand } from "../src/commands/right_command";
import { RobotState } from "../src/robot";

const defaultState: RobotState = {
    x: 0,
    y: 0,
    direction: ValidDirection.NORTH,
    is_placed: true,
}

describe('Test commands', () => {
    it('LEFT changes direction to WEST', () => {
        const command = new LeftCommand([]);
        expect(command.run(defaultState).direction).toBe(ValidDirection.WEST)
    })
    it('RIGHT changes direction to EAST', () => {
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
        try { new PlaceCommand(['1', '2', 'UP']) } catch (e) { expect(e).toBeInstanceOf(InvalidCommandArguments) }
        try { new PlaceCommand(['1', 'A', 'WEST']) } catch (e) { expect(e).toBeInstanceOf(InvalidCommandArguments) }
        try { new PlaceCommand(['A', '2', 'WEST']) } catch (e) { expect(e).toBeInstanceOf(InvalidCommandArguments) }
        try { new PlaceCommand(['1', '2', 'WEST', 'UNUSED']) } catch (e) { expect(e).not.toBeInstanceOf(InvalidCommandArguments) }
        try { new PlaceCommand([]) } catch (e) { expect(e).toBeInstanceOf(InvalidCommandArguments) }

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