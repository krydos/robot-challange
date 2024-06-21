import { Runner } from './src/runner';


// TODO show usage
// TODO show unknown command error in interactive mode
// TODO commands should be case insensitive
// TODO validate commands input
// TODO validate robot movements
// TODO don't use strings for directions
// DONE get rid of test/data folder
// DONE convert to ES6 modules
// DONE Mark commands as mutable or not (this should help with figuring out if should check if move is valid)


// ignore binary and the script names
const args = process.argv.slice(2);

const runner = new Runner();
if (args.length > 0) {
    runner.from_file(args[0]);
} else {
    runner.interactive();
}

