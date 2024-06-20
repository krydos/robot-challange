module.exports.Robot = class {
    constructor() {
        this.x = undefined
        this.y = undefined
        this.face = undefined
        this.is_placed = false
    }
    execute(command) {
        command.run(this)
    }
}