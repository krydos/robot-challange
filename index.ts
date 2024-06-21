import { ConsoleOutputHandler } from './src/output_handler';
import { Runner } from './src/runner';


// TODO show usage
// TODO lint variable names
// TODO think about changing how left & right command works
// TODO NopCommand and PlaceCommand should not be treated specially in the runner
// TODO get rid of some DRY in tests
// TODO make config to configure the board
// TODO probably use interfaces instead Robot and Table classes in the runner
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


// ignore binary and the script names
const args = process.argv.slice(2);

const runner = new Runner(new ConsoleOutputHandler());
if (args.length > 0) {
    runner.fromFile(args[0]);
} else {
    runner.interactive();
}

