import { Runner } from './src/runner';
import * as configData from './config.json';
import { SimpleBoard } from './src/board';
import { SimpleRobot } from './src/robot';
import { ConsoleOutputHandler } from './src/output_handler';
import { SimpleMoveValidator } from './src/validators/simple_move_validator';
import { SimpleParser } from './src/parsers/simple_parser';

// ignore binary and the script name
const args = process.argv.slice(2);

const config = {
    robot: new SimpleRobot(),
    board: new SimpleBoard(configData?.board?.cols || 5, configData?.board?.rows || 5),
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

