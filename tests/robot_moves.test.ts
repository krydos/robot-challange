import { SimpleRobot } from "../src/robot"
import { SimpleParser } from "../src/parsers/simple_parser";
import { SimpleBoard } from "../src/board";

function runCommand(robot: SimpleRobot, command: string) {
    const parser = new SimpleParser();
    const board = new SimpleBoard(5, 5);
    robot.setState(parser.parseCommand(command).run(robot.getState(), board));
}

describe('Basic examples from the task description', () => {
    it('place and move commands are changing position of the robot', () => {
        const robot = new SimpleRobot();
        runCommand(robot, 'PLACE 0,0,NORTH');
        runCommand(robot, 'MOVE');
        expect(robot.getState()).toEqual({
            y: 1,
            x: 0,
            isPlaced: true,
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