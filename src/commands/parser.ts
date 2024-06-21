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
    const cmd_and_args = command.trim().split(' ');
    let args: string[] = [];
    if (cmd_and_args.length > 1) {
        args = cmd_and_args[1].split(',')
    }

    for (const commandClass of availableCommands) {
        const signatureRegexp = new RegExp(commandClass.signature, 'i');
        if (signatureRegexp.test(cmd_and_args[0])) {
            return new commandClass(args)
        }
    }

    console.log(`Unknown or invalid command "${command}"`)

    return new NopCommand(args);
}