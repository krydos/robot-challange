import { SimpleRobot } from "../src/robot"
import { ParseCommand } from "../src/commands/parser";

function runCommand(robot: SimpleRobot, command: string) {
    robot.setState(ParseCommand(command).run(robot.getState()));
}

describe('Basic examples from the task description', () => {
    it('place and move commands are changing position of the robot', () => {
        const robot = new SimpleRobot();
        runCommand(robot, 'PLACE 0,0,NORTH');
        runCommand(robot, 'MOVE');
        expect(robot.getState()).toEqual({
            y: 1,
            x: 0,
            is_placed: true,
            direction: 'NORTH'
        })
    })

    it('robot can turn', () => {
        const robot = new SimpleRobot();
        runCommand(robot, 'PLACE 0,0,NORTH');
        runCommand(robot, 'LEFT');
        expect(robot.getState().direction).toBe('WEST')
        runCommand(robot, 'RIGHT')
        expect(robot.getState().direction).toBe('NORTH')
    })

    it('robot can be placed anywhere', () => {
        const robot = new SimpleRobot();
        runCommand(robot, 'PLACE 999,-999,EAST')
        expect(robot.getState().x).toBe(999)
        expect(robot.getState().y).toBe(-999)
        expect(robot.getState().direction).toBe('EAST')
    })
})