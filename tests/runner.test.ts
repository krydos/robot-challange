import { SimpleBoard } from "../src/board";
import { OutputHandler } from "../src/output_handler";
import { StateFullRobot, SimpleRobot } from "../src/robot";
import { Runner } from "../src/runner"
import { SimpleMoveValidator } from "../src/validators/simple_move_validator";

let collectedOutput: Array<string> = []
const ArrayOutputHandler = class implements OutputHandler {
    write(output: string) {
        collectedOutput.push(output)
    }
}

function* inputGenerator(moves: Array<string>) {
    for (const move of moves) {
        yield move;
    }
};

function setupDefaultRunner(): [Runner, StateFullRobot] {
    const robot = new SimpleRobot();
    const runner = new Runner({
        robot: robot,
        board: new SimpleBoard(5, 5),
        outputHandler: new ArrayOutputHandler(),
        moveValidator: new SimpleMoveValidator(),
    })

    return [runner, robot]
}

describe('Test the runner', () => {
    it('execute commands returned from the input function', () => {
        const [runner, robot] = setupDefaultRunner();
        const gen = inputGenerator([
            'PLACE 0,0,NORTH',
            'MOVE'
        ]);
        runner.run(() => gen.next().value)
        expect(robot.getState()).toMatchObject({direction: 'NORTH', y: 1})
    })
    it('commands are ignored if robot is not placed', () => {
        collectedOutput = []
        const [runner, robot] = setupDefaultRunner();
        const gen = inputGenerator([
            'MOVE',
            'LEFT',
            'MOVE',
            'REPORT'
        ]);
        runner.run(() => gen.next().value)
        expect(robot.getState()).toMatchObject({
            x: 0,
            y: 0,
            is_placed: false,
            direction: undefined
        })
        expect(collectedOutput.length).toBe(0) // no output from REPORT
    })
    it('report command should report to output handler', () => {
        collectedOutput = []
        const [runner, _] = setupDefaultRunner();
        const gen = inputGenerator([
            'PLACE 0,0,NORTH',
            'RIGHT',
            'MOVE',
            'REPORT'
        ]);
        runner.run(() => gen.next().value)
        expect(collectedOutput.length).toBe(1)
        expect(collectedOutput[0]).toBe('1,0,EAST')
    })
    it('should allow multiple place commands', () => {
        collectedOutput = []
        const [runner, _] = setupDefaultRunner();
        const gen = inputGenerator([
            'PLACE 0,0,NORTH',
            'RIGHT',
            'MOVE',
            'REPORT',
            'PLACE 1,1,WEST',
            'REPORT',
        ]);
        runner.run(() => gen.next().value)
        expect(collectedOutput.length).toBe(2)
        expect(collectedOutput[0]).toBe('1,0,EAST')
        expect(collectedOutput[1]).toBe('1,1,WEST')
    })
    it('should trim commands and arguments', () => {
        collectedOutput = []
        const [runner, _] = setupDefaultRunner();
        const gen = inputGenerator([
            'PLACE  0, 0,NORTH ',
            'REPORT',
        ]);
        runner.run(() => gen.next().value)
        expect(collectedOutput[0]).toBe('0,0,NORTH')
    })
    it('should ignore unknown commands, empty strings and broken arguments', () => {
        collectedOutput = []
        const [runner, _] = setupDefaultRunner();
        const gen = inputGenerator([
            'PLACE 0,0,NORTH',
            'MOVE',
            '<UNKNOWN_COMMAND>',
            '',
            'PLACE 1,1,UP',
            'PLACE 1,,UP',
            'PLACE ,,,',
            'REPORT',
        ]);
        runner.run(() => gen.next().value)
        expect(collectedOutput[collectedOutput.length-1]).toBe('0,1,NORTH')
    })
})