class PlaceCommand {
    constructor(x, y, face) {
        this.x = parseInt(x)
        this.y = parseInt(y)
        this.face = face
    }

    run(robot) {
        return {
            x: this.x,
            y: this.y,
            face: this.face,
            is_placed: true
        }
    }
}
module.exports.PlaceCommand = PlaceCommand

class LeftCommand {
    run(robot) {
        if (robot.getFace() == 'NORTH') return { face: 'WEST' }
        if (robot.getFace() == 'WEST') return { face: 'SOUTH' }
        if (robot.getFace() == 'SOUTH') return { face: 'EAST' }
        if (robot.getFace() == 'EAST') return { face: 'NORTH' }
    }
}
module.exports.LeftCommand = LeftCommand

class RightCommand {
    run(robot) {
        if (robot.getFace() == 'NORTH') return { face: 'EAST' }
        if (robot.getFace() == 'EAST') return { face: 'SOUTH' }
        if (robot.getFace() == 'SOUTH') return { face: 'WEST' }
        if (robot.getFace() == 'WEST') return { face: 'NORTH' }
    }
}
module.exports.RightCommand = RightCommand

 class MoveCommand {
    run(robot) {
        if (robot.getFace() == 'NORTH') return { y: robot.getY()+1 }
        if (robot.getFace() == 'SOUTH') return { y: robot.getY()-1 };
        if (robot.getFace() == 'EAST') return { x: robot.getX()+1 };
        if (robot.getFace() == 'WEST') return { x: robot.getX()-1 };
    }
}
module.exports.MoveCommand = MoveCommand

class ReportCommand {
    run(robot) {
        console.log(`${robot.getX()},${robot.getY()},${robot.getFace()}`)
        return {}
    }
}
module.exports.ReportCommand = ReportCommand

const CMD_MAP = {
    '^place$': PlaceCommand,
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
            return new commandClass(...args)
        }
    }

    console.log(`Unknown or invalid command "${command_str}"`)

    return null;
}