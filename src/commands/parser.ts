import { Command } from "./common";
import { PlaceCommand } from "./place_command";
import { MoveCommand } from "./move_command";
import { ReportCommand } from "./report_command";
import { LeftCommand } from "./left_command";
import { RightCommand } from "./right_command";
import { NopCommand } from "./nop_command";

// Modify this array to add new command.
const availableCommands = [
    PlaceCommand,
    MoveCommand,
    ReportCommand,
    LeftCommand,
    RightCommand
]

function fetchCommand(command: string): string {
    const match = command.match(/^(\w+)\s*/)
    if (! match) {
        return ''
    }
    return match[1].trim()
}
function fetchArguments(command: string): Array<string> {
    const match = command.match(/^\w+\s(.+?)$/)
    if (! match) {
        return [];
    }

    return match[1].split(',').map(arg => arg.trim());
}

// We get commandExpression from user input
// and it can easily be anything.
// Treat it with caution.
// NopCommand is returned when commandExpression cannot be parsed.
export function ParseCommand(commandExpression: string): Command {
    commandExpression = commandExpression.trim();
    const cmd = fetchCommand(commandExpression);
    const args = fetchArguments(commandExpression);

    for (const commandClass of availableCommands) {
        if (cmd.toLowerCase().startsWith(commandClass.signature.toLowerCase())) {
            try {
                return new commandClass(args)
            } catch(e) {
                return new NopCommand(args);
            }

        }
    }

    return new NopCommand(args);
}