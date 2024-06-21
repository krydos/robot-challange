import { Command } from "./common";
import { PlaceCommand } from "./place_command";
import { MoveCommand } from "./move_command";
import { ReportCommand } from "./report_command";
import { LeftCommand } from "./left_command";
import { RightCommand } from "./right_command";
import { NopCommand } from "./nop_command";

const availableCommands = [
    PlaceCommand,
    MoveCommand,
    ReportCommand,
    LeftCommand,
    RightCommand
]

export function ParseCommand(command: string): Command {
    const cmdWithArgs = command.toLowerCase().trim().split(' ').map(chunk => chunk.trim());
    let args: string[] = [];

    // split arguments
    if (cmdWithArgs.length > 1) {
        args = cmdWithArgs[1].split(',')
    }

    for (const commandClass of availableCommands) {
        if (cmdWithArgs[0].startsWith(commandClass.signature)) {
            try {
                return new commandClass(args)
            } catch(e) {
                return new NopCommand(args);
            }

        }
    }

    return new NopCommand(args);
}