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
    direction: 'NORTH',
    is_placed: true,
}

describe('Test commands', () => {
    it('LEFT changes direction to WEST', () => {
        const command = new LeftCommand([]);
        expect(command.run(defaultState).direction).toBe('WEST')
    })
    it('RIGHT changes direction to EAST', () => {
        const command = new RightCommand([]);
        expect(command.run(defaultState).direction).toBe('EAST')
    })
    it('PLACE changes coordinates and direction', () => {
        const command = new PlaceCommand([1, 2, 'SOUTH']);
        expect(command.run(defaultState)).toMatchObject({
            x: 1,
            y: 2,
            direction: 'SOUTH',
        })
    })
    it('MOVE changes coordinates', () => {
        const command = new MoveCommand([]);
        expect(command.run({...defaultState, ...{ direction: 'NORTH' }}).y).toBe(1)
        expect(command.run({...defaultState, ...{ direction: 'SOUTH' }}).y).toBe(-1)
        expect(command.run({...defaultState, ...{ direction: 'EAST' }}).x).toBe(1)
        expect(command.run({...defaultState, ...{ direction: 'WEST' }}).x).toBe(-1)
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