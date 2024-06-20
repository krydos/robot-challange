module.exports.Robot = class {
    constructor() {
        this.state = {
            x: undefined,
            y: undefined,
            face: undefined,
            is_placed: false
        }
    }

    getX() {
        return this.state.x;
    }

    getY() {
        return this.state.y;
    }

    getFace() {
        return this.state.face;
    }

    isPlaced() {
        return this.state.is_placed;
    }

    getState() {
        return this.state;
    }

    execute(command) {
        const stateChanges = command.run(this);
        for (const [propName, value] of Object.entries(stateChanges)) {
            if (this.state.hasOwnProperty(propName)) {
                this.state[propName] = value
            }
        }
    }
}