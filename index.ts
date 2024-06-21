import { ConsoleOutputHandler } from './src/output_handler';
import { Runner } from './src/runner';


// TODO show usage
// TODO show unknown command error in interactive mode
// TODO commands should be case insensitive
// TODO validate commands input
// TODO validate robot movements
// TODO don't use strings for directions
// TODO lint variable names
// TODO think about changing how left & right command works
// TODO place command has terrible arguments handler
// DONE get rid of test/data folder
// DONE convert to ES6 modules
// DONE Mark commands as mutable or not (this should help with figuring out if should check if move is valid)


// ignore binary and the script names
const args = process.argv.slice(2);

const runner = new Runner(new ConsoleOutputHandler());
if (args.length > 0) {
    runner.fromFile(args[0]);
} else {
    runner.interactive();
}

