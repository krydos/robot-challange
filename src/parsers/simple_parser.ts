import { LeftCommand } from "../commands/left_command"
import { MoveCommand } from "../commands/move_command"
import { PlaceCommand } from "../commands/place_command"
import { ReportCommand } from "../commands/report_command"
import { RightCommand } from "../commands/right_command"
import { BaseParser } from "./base_parser"

export class SimpleParser extends BaseParser {
    protected availableCommands = {
        'place': PlaceCommand,
        'move': MoveCommand,
        'report': ReportCommand,
        'left': LeftCommand,
        'right': RightCommand
    }
    fetchCommand(commandExpression: string) {
        const match = commandExpression.match(/^(\w+)\s*/);
        if (! match) {
            return '';
        }
        return match[1].trim();
    }
    fetchArguments(commandExpression: string): Array<string> {
        const match = commandExpression.match(/^\w+\s(.+?)$/);
        if (! match) {
            return [];
        }

        return match[1].split(',').map(arg => arg.trim());
    }
}