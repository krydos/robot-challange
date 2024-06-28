import { InvalidBoardBoundaries, SimpleBoard } from "../src/board"
import { SimpleMoveValidator } from "../src/validators/simple_move_validator"

describe('Simple Board', () => {
    it('instantiated with proper input', () => {
        expect(new SimpleBoard(1, 1)).toBeInstanceOf(SimpleBoard)
    })
    it('rejects negative dimensions', () => {
        expect(() => new SimpleBoard(-1, 1)).toThrow(InvalidBoardBoundaries);
        expect(() => new SimpleBoard(1, -1)).toThrow(InvalidBoardBoundaries);
    })
    it('rejects float numbers', () => {
        expect(() => new SimpleBoard(0.1, 1)).toThrow(InvalidBoardBoundaries);
        expect(() => new SimpleBoard(1, 0.1)).toThrow(InvalidBoardBoundaries);
    })
    it('rejects valid children for a position', () => {
        const board = new SimpleBoard(5, 5)
        board.setValidator(new SimpleMoveValidator())
        const children = board.getValidChildren({x: 0, y: 0})
        expect(children[0].x).toBe(0)
        expect(children[0].y).toBe(1)

        expect(children[1].x).toBe(1)
        expect(children[1].y).toBe(0)

        expect(children.length).toBe(2)
    })
})