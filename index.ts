import { Runner } from './src/runner';
import * as configData from './config.json';
import { SimpleBoard } from './src/board';
import { SimpleRobot } from './src/robot';
import { ConsoleOutputHandler } from './src/output_handler';
import { SimpleMoveValidator } from './src/validators/simple_move_validator';
import { SimpleParser } from './src/parsers/simple_parser';


// TODO show usage
// TODO lint variable names
// DONE negative board dimensions shouldn't be possible... I guess...
// DONE think about changing how left & right command works
// DONE NopCommand and PlaceCommand should not be treated specially in the runner
// DONE get rid of some DRY in tests
// DONE make config to configure the board
// DONE remove mutable field from commands (I don't think I use it)
// DONE place command has terrible arguments handler
// DONE don't use strings for directions
// DONE validate robot movements
// DONE validate commands input
// DONE commands should be case insensitive
// DONE show unknown command error in interactive mode
// DONE get rid of test/data folder
// DONE convert to ES6 modules
// DONE Mark commands as mutable or not (this should help with figuring out if should check if move is valid)


// ignore binary and the script name
const args = process.argv.slice(2);

const config = {
    robot: new SimpleRobot(),
    board: new SimpleBoard(configData?.board?.x || 5, configData?.board?.y || 5),
    outputHandler: new ConsoleOutputHandler(),
    moveValidator: new SimpleMoveValidator(),
    commandParser: new SimpleParser()
}

const runner = new Runner(config);
if (args.length > 0) {
    runner.fromFile(args[0]);
} else {
    runner.interactive();
}

