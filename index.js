const RunMode = require('./src/run_mode').RunMode;


// TODO show usage
// TODO show unknown command error in interactive mode
// TODO commands should be case insensitive
// TODO validate commands input
// TODO validate robot movements
// TODO convert to ES6 modules
// TODO get rid of test/data folder


// ignore binary and the script names
const args = process.argv.slice(2);

if (args.length > 0) {
    RunMode.from_file(args[0]);
} else {
    RunMode.interactive();
}

