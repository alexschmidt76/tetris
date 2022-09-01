class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.currentPiece = null;
        this.grid = Array(20).fill(Array(10).fill(0));
    }
}

let game = new Game('ctx')
console.log(game.grid)
console.log(';o;')
