//const RunMode = require('./src/run_mode').RunMode;

import { RunMode } from './src/run_mode';


// TODO show usage
// TODO show unknown command error in interactive mode
// TODO commands should be case insensitive
// TODO validate commands input
// TODO validate robot movements
// TODO convert to ES6 modules
// TODO get rid of test/data folder
// TODO Mark commands as mutable or not (this should help with figuring out if should check if move is valid)


// ignore binary and the script names
const args = process.argv.slice(2);

if (args.length > 0) {
    RunMode.from_file(args[0]);
} else {
    RunMode.interactive();
}

