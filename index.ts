import { Runner } from './src/runner';
import { Obstacle, SimpleBoard } from './src/board';
import { SimpleRobot } from './src/robot';
import { ConsoleOutputHandler } from './src/output_handler';
import { SimpleMoveValidator } from './src/validators/simple_move_validator';
import { SimpleParser } from './src/parsers/simple_parser';
import ConfigData from "./config.json"

// ignore binary and the script name
const args = process.argv.slice(2);

const obstacles: Array<Obstacle> = [];

for (const obstacleData of ConfigData.board.obstacles) {
    obstacles.push(new Obstacle(obstacleData.x, obstacleData.y));
}

const config = {
    robot: new SimpleRobot(),
    board: new SimpleBoard(parseInt(process.env.COLS || '5'), parseInt(process.env.ROWS || '5'), obstacles),
    outputHandler: new ConsoleOutputHandler(),
    moveValidator: new SimpleMoveValidator(),
    commandParser: new SimpleParser(),
}

const runner = new Runner(config);
if (args.length > 0) {
    runner.fromFile(args[0]);
} else {
    runner.interactive();
}

