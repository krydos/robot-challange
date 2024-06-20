const assert = require("node:assert");
const { parseCommand } = require("../src/commands");

const Robot = require('../src/robot').Robot;

function place_command_properly_initializes_robots_state() {
    const robot = new Robot()
    robot.execute(parseCommand('PLACE 0,0,NORTH'));
    assert.equal(robot.x, 0);
    assert.equal(robot.y, 0);
    assert.equal(robot.face, 'NORTH');
}

function robot_moves_properly_without_limits() {
    const robot = new Robot()
    robot.execute(parseCommand('PLACE 0,0,NORTH'));
    robot.execute(parseCommand('MOVE'));
    robot.execute(parseCommand('LEFT'));
    robot.execute(parseCommand('MOVE'));

    assert.equal(robot.x, -1);
    assert.equal(robot.y, 1);
    assert.equal(robot.face, 'WEST');
}

function robot_state_doesnt_change_if_not_placed() {
    const robot = new Robot()
    robot.execute(parseCommand('MOVE'));
    robot.execute(parseCommand('LEFT'));

    assert.equal(robot.x, undefined);
    assert.equal(robot.y, undefined);
    assert.equal(robot.face, undefined);
}

function run() {
    place_command_properly_initializes_robots_state();
    robot_moves_properly_without_limits();
    robot_state_doesnt_change_if_not_placed();
}

module.exports = run
