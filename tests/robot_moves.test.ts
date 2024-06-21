import { Robot } from "../src/robot"
import { ParseCommand } from "../src/commands/parser";

describe('Basic examples from the task description', () => {
    it('place and move commands are changing position of the robot', () => {
        const robot = new Robot();
        robot.execute(ParseCommand('PLACE 0,0,NORTH'));
        robot.execute(ParseCommand('MOVE'));
        expect(robot.getState()).toEqual({
            y: 1,
            x: 0,
            is_placed: true,
            direction: 'NORTH'
        })
    })

    it('robot can turn', () => {
        const robot = new Robot();
        robot.execute(ParseCommand('PLACE 0,0,NORTH'));
        robot.execute(ParseCommand('LEFT'));
        expect(robot.getState().direction).toBe('WEST')
        robot.execute(ParseCommand('RIGHT'));
        expect(robot.getState().direction).toBe('NORTH')
    })

    it('robot can be placed anywhere', () => {
        const robot = new Robot();
        robot.execute(ParseCommand('PLACE 1,3,EAST'));
        expect(robot.getState().x).toBe(1)
        expect(robot.getState().y).toBe(3)
        expect(robot.getState().direction).toBe('EAST')
    })
})