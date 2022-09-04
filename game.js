class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.currentPiece = null;
        this.grid = Array(ROWS).fill(Array(COLS).fill(0));
    }

    showSelf() {
        // black background
        drawRect(this.ctx, 0, 0, COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE, '#000000');

        // show pieces
        this.grid.forEach( (row, i) => row.forEach( (tile, j) => {
            if (tile != 0) {
                drawRect(this.ctx, j * BLOCK_SIZE, i * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, COLORS[tile]);
            }
        }))
    }
}
