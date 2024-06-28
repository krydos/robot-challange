import { RobotState } from "../src/robot"
import { Obstacle, SimpleBoard } from "../src/board"
import { SimpleMoveValidator } from "../src/validators/simple_move_validator"
import { ValidDirection } from "../src/commands/utils"

const defaultState: RobotState = {
    x: 0,
    y: 0,
    direction: ValidDirection.NORTH,
    isPlaced: true
}

const obstacles: Array<Obstacle> = [
    new Obstacle(1, 1)
];

const board = new SimpleBoard(5,5, obstacles)

describe('Simple move validator', () => {
    it('return false in case of out of boundaries', () => {
        const validator = new SimpleMoveValidator()

        expect(validator.isMoveValid(defaultState, {...defaultState, ...{x: 6}}, board)).toBeFalsy()
        expect(validator.isMoveValid(defaultState, {...defaultState, ...{x: -1}}, board)).toBeFalsy()
        expect(validator.isMoveValid(defaultState, {...defaultState, ...{y: 6}}, board)).toBeFalsy()
        expect(validator.isMoveValid(defaultState, {...defaultState, ...{y: -1}}, board)).toBeFalsy()
    })

    it('return true for valid moves', () => {
        const validator = new SimpleMoveValidator()

        expect(validator.isMoveValid(defaultState, { ...defaultState, ...{ x: 5 } }, board)).toBeTruthy()
        expect(validator.isMoveValid(defaultState, { ...defaultState, ...{ x: 0 } }, board)).toBeTruthy()
        expect(validator.isMoveValid(defaultState, { ...defaultState, ...{ x: 3 } }, board)).toBeTruthy()
    })

    it('return false in case of obstacle', () => {
        const validator = new SimpleMoveValidator()
        expect(validator.isMoveValid(defaultState, { ...defaultState, ...{ x: 1, y: 1 } }, board)).toBeFalsy()
        expect(validator.isMoveValid(defaultState, { ...defaultState, ...{ x: 1, y: 0 } }, board)).toBeTruthy()
    })
})