import { Robot } from "../src/robot"
import { ParseCommand } from "../src/commands/parser";

describe('Basic examples from the task description', () => {
    it('place and move commands are changing position of the robot', () => {
        const robot = new Robot();
        robot.setState(ParseCommand('PLACE 0,0,NORTH').run(robot.getState()));
        robot.setState(ParseCommand('MOVE').run(robot.getState()));
        expect(robot.getState()).toEqual({
            y: 1,
            x: 0,
            is_placed: true,
            direction: 'NORTH'
        })
    })

    it('robot can turn', () => {
        const robot = new Robot();
        robot.setState(ParseCommand('PLACE 0,0,NORTH').run(robot.getState()));
        robot.setState(ParseCommand('LEFT').run(robot.getState()));
        expect(robot.getState().direction).toBe('WEST')
        robot.setState(ParseCommand('RIGHT').run(robot.getState()));
        expect(robot.getState().direction).toBe('NORTH')
    })

    it('robot can be placed anywhere', () => {
        const robot = new Robot();
        robot.setState(ParseCommand('PLACE 1,3,EAST').run(robot.getState()));
        expect(robot.getState().x).toBe(1)
        expect(robot.getState().y).toBe(3)
        expect(robot.getState().direction).toBe('EAST')
    })
})