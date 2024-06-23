# Robot challenge

## Install

- `npm install`
- `npm run compile`

## Run / Play / Test

### REPL

- `npm run repl`

I've got built-in repl there for you.
Feel free to type any command in lowercase.
Wrong/broken and invalid commands are ignored (no output) as well as commands to "unPLACEd" robot.

There are NON of GNU Readline stuff available (up/down arrows, alt-*, ctrl+a, etc...)
which may be annoying a bit. I'm aware of [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) but I
thought it's too much.

### Run unit / integration tests

- `npm test`

### Test files

These files aren't used in the test suite. I added them for you to run and see what's going on.

- `npm run test-simple-file` - simple file with regular commands. Should return **3,3,NORTH**.
- `npm run test-broken-file` - file with empty lines, strange commands and broken arguments. Should return **1,0,EAST**
- `node ./build/index.js <path to your file>` - test on your file.

You can also generate ~230MB file using `npm run generate-big-file` and then
run it with `npm run test-big-file` (assuming you're on MacOS/Linux/WSL).
See `./scripts/generate-big-file` if you want to change the amount of data generated.
It's gonna be 5 Million commands and may take around 20 seconds to execute all of them.
It has constant mem usage on the other hand - files are never getting read fully in memory.
This one should return **5,0,EAST** (in case of 5,5 board size).

## Board Size Configuration

Board size can be configured using ENV variables.
Just run `COLS=3 ROWS=3 npm run repl` (or any other npm/node command).

## Some notes

- Every command generate a new state.
- Robot is clueless where it is and whether there are any boards at all.
- Added a validator to check if the new state is valid/within a board (and assign it to the robot if it is)
- Added a "runner" which responsibility is to clue things together
- I tried to over-engineer and premature-optimization-is-root-of-all-evil reasonably.
- There is no top level try/catch on purpose. So if something's wrong, you should see custom exceptions thrown with stacktrace for details.
- I "Would be happy to have code of a similar standard in production"
