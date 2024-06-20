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

module.exports.parseCommand = function(command_str) {
    command_str = command_str.toLowerCase()
    if (/place/.test(command_str)) {
        const cmd_and_args = command_str.trim().split(' ');
        const args = cmd_and_args[1].split(',')
        return new PlaceCommand(args)
    }
    if (/move/.test(command_str)) {
        return new MoveCommand();
    }
    if (/report/.test(command_str)) {
        return new ReportCommand();
    }
    if (/left/.test(command_str)) {
        return new LeftCommand();
    }
    if (/right/.test(command_str)) {
        return new RightCommand();
    }

    throw new Error(`Unknown command ${command_str}`)
}