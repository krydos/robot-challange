class PlaceCommand {
    constructor(args) {
        this.x = args[0]
        this.y = args[1]
        this.face = args[2]
    }

    run(robot) {
        robot.x = this.x
        robot.y = this.y
        robot.face = this.face.toUpperCase()
        robot.is_placed = true
    }
}
module.exports.PlaceCommand = PlaceCommand

class LeftCommand {
    run(robot) {
        if (robot.face == 'NORTH') robot.face = 'WEST'
        else if (robot.face == 'WEST') robot.face = 'SOUTH'
        else if (robot.face == 'SOUTH') robot.face = 'EAST'
        else if (robot.face == 'EAST') robot.face = 'NORTH'
    }
}
module.exports.LeftCommand = LeftCommand

class RightCommand {
    run(robot) {
        if (robot.face == 'NORTH') robot.face = 'EAST'
        else if (robot.face == 'EAST') robot.face = 'SOUTH'
        else if (robot.face == 'SOUTH') robot.face = 'WEST'
        else if (robot.face == 'WEST') robot.face = 'NORTH'
    }
}
module.exports.RightCommand = RightCommand

 class MoveCommand {
    run(robot) {
        if (robot.face == 'NORTH') robot.y++;
        else if (robot.face == 'SOUTH') robot.y--;
        else if (robot.face == 'EAST') robot.x++;
        else if (robot.face == 'WEST') robot.x--;
    }
}
module.exports.MoveCommand = MoveCommand

class ReportCommand {
    run(robot) {
        console.log(`${robot.x},${robot.y},${robot.face}`)
    }
}
module.exports.ReportCommand = ReportCommand

const CMD_MAP = {
    '^place(\s|$)': PlaceCommand,
    '^move$': MoveCommand,
    '^report$': ReportCommand,
    '^left$': LeftCommand,
    '^right$': RightCommand
}

module.exports.parseCommand = function(command_str) {
    const cmd_and_args = command_str.trim().split(' ');
    let args = [];
    if (cmd_and_args.length > 1) {
        args = cmd_and_args[1].split(',')
    }

    for (const [regexpStr, commandClass] of Object.entries(CMD_MAP)) {
        const regexp = new RegExp(regexpStr, 'i');
        if (regexp.test(cmd_and_args[0])) {
            return new commandClass(args)
        }
    }

    console.log(`Unknown command ${command_str}`)

    return null;
}