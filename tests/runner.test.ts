import { Runner } from "../src/runner"

function* inputGenerator(moves: Array<string>) {
    for (const move of moves) {
        yield move;
    }
};

describe('Check the runner', () => {
    it('should run commands returned from the input function', () => {
        const runner = new Runner();
        const gen = inputGenerator([
            'PLACE 0,0,NORTH',
            'MOVE'
        ]);
        runner.run(() => gen.next().value)
        expect(runner.robot.getState()).toMatchObject({direction: 'NORTH', y: 1})
    })
    it('should not change the state of robot if robot is not placed', () => {
        const runner = new Runner();
        const gen = inputGenerator([
            'MOVE',
            'LEFT',
            'MOVE',
        ]);
        runner.run(() => gen.next().value)
        expect(runner.robot.getState()).toMatchObject({
            x: 0,
            y: 0,
            is_placed: false,
            direction: undefined
        })
    })
})