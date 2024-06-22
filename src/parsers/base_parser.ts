import { Command } from "../commands/base_command";
import { NopCommand } from "../commands/nop_command";

export interface ParseCommand {
    parseCommand(commandExpression: string): Command
}

export abstract class BaseParser implements ParseCommand {
    // Every parser may have its own list of commands it can parse.
    availableCommands: {[key: string]: new(args: Array<any>) => Command} = {}

    abstract fetchCommand(commandExpression: string): string;
    abstract fetchArguments(commandExpression: string): Array<string>;

    parseCommand(commandExpression: string): Command {
        commandExpression = commandExpression.trim();
        const cmd = this.fetchCommand(commandExpression);
        const args = this.fetchArguments(commandExpression);

        for (const [signature, commandClass] of Object.entries(this.availableCommands)) {
            if (cmd.toLowerCase().startsWith(signature.toLowerCase())) {
                try {
                    return new commandClass(args)
                } catch(e) {
                    return new NopCommand(args);
                }

            }
        }

        return new NopCommand(args);
    }
}