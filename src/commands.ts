import { RobotState } from './robot'

export type ValidDirection = 'NORTH' | 'SOUTH' | 'WEST' | 'EAST';

export interface ICommand {
    run(state: RobotState): RobotState
}

class PlaceCommand implements ICommand {
    constructor(
        private args: any
    ) {}


    run(state: RobotState): RobotState {
        return {
            ...state,
            ...{
                x: parseInt(this.args[0]),
                y: parseInt(this.args[1]),
                face: this.args[2],
                is_placed: true
            }
        }
    }
}

class LeftCommand implements ICommand {
    constructor(
        private args: any
    ) {}
    run(state: RobotState): RobotState {
        if (state.face == 'NORTH') return { ...state, ...{ face: 'WEST' } }
        if (state.face == 'WEST') return { ...state, ... { face: 'SOUTH' } }
        if (state.face == 'SOUTH') return { ...state, ...{ face: 'EAST' } }
        if (state.face == 'EAST') return { ...state, ... { face: 'NORTH' } }

        return state;
    }
}

class RightCommand implements ICommand {
    constructor(
        private args: any
    ) {}
    run(state: RobotState): RobotState {
        if (state.face == 'NORTH') return { ...state, ...{ face: 'EAST' } }
        if (state.face == 'EAST') return { ...state, ...{ face: 'SOUTH' } }
        if (state.face == 'SOUTH') return { ...state, ...{ face: 'WEST' } }
        if (state.face == 'WEST') return { ...state, ...{ face: 'NORTH' } }

        return state
    }
}

class MoveCommand {
    constructor(
        private args: any
    ) {}
    run(state: RobotState): RobotState {
        if (state.face == 'NORTH') return { ...state, ...{ y: state.y + 1 } }
        if (state.face == 'SOUTH') return { ...state, ...{ y: state.y - 1 } }
        if (state.face == 'EAST') return { ...state, ...{ x: state.x + 1 } }
        if (state.face == 'WEST') return { ...state, ...{ x: state.x - 1 } }

        return state;
    }
}

class ReportCommand implements ICommand {
    constructor(
        private args: any
    ) {}
    run(state: RobotState): RobotState {
        console.log(`${state.x},${state.y},${state.face}`)
        return state
    }
}

const CMD_MAP = {
    '^place$': PlaceCommand,
    '^move$': MoveCommand,
    '^report$': ReportCommand,
    '^left$': LeftCommand,
    '^right$': RightCommand
}

export function parseCommand(command_str: string) {
    const cmd_and_args = command_str.trim().split(' ');
    let args: string[] = [];
    if (cmd_and_args.length > 1) {
        args = cmd_and_args[1].split(',')
    }

    for (const [regexpStr, commandClass] of Object.entries(CMD_MAP)) {
        const regexp = new RegExp(regexpStr, 'i');
        if (regexp.test(cmd_and_args[0])) {
            try {
                return new commandClass(args)
            } catch (e) {
                console.log(e)
                return null
            }
        }
    }

    console.log(`Unknown or invalid command "${command_str}"`)

    return null;
}
