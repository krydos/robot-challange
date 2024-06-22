# Robot challenge

## Install

- `npm install`
- `npm run compile`

## Run / Play / Test

### REPL

I've got built-in repl there for you to try so `npm run repl` should do the thing.
Feel free to type in lowercase.
Wrong/broken and invalid commands are ignored (no output) as well as commands to "unPLACEd" robot.

There are NON of GNU Readline stuff available (up/down arrows, alt-*, ctrl+a, etc...)
which may be annoying a bit. I'm aware of [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) but I
thought it's too much.

### Test files

- `npm run test-simple-file` - simple file with regular commands
- `npm run test-broken-file` - file with empty lines, strange commands and broken arguments. Must not fail.
- `node ./build/index.js <path to your file>` - test on your file

You can also generate ~230MB file using `npm run generate-big-file` and then
run it with `npm run test-big-file` (assuming you're on MacOS/Linux/WSL).
See `./scripts/generate-big-file` if you want to change the amount of data generated.
It's gonna be 5 Million commands and may take around 20 seconds to execute all of them.
It has constant mem usage on the other hand - files are never getting read fully in memory.

### Config

Use `config.json` to update the size of the board.

## Some notes

- Every command generate a new state.
- Robot is clueless where it is and whether there are any boards at all.
- Added a validator to check if the new state is valid/within a board (and assign it to the robot if it is)
- Added a "runner" which responsibility is to clue things together
- I tried to over-engineer and premature-optimization-is-root-of-all-evil reasonably.
- There is no top level try/catch on purpose. So if something wrong, you should see custom exceptions thrown with stacktrace for details.
- I "Would be happy to have code of a similar standard in production"
