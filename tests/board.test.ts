import { InvalidBoardBoundaries, SimpleBoard } from "../src/board"

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
})