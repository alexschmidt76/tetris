class Piece  {
    constructor(shape, ctx) {
        this.shape = shape;
        this.ctx = ctx;
        this.x = COLS / 2;
        this.y = 0;
    }

    showSelf() {
        this.shape.forEach( (row, i) => row.forEach( (tile, j) => {
            if (tile != 0) {
                drawRect(this.ctx, x + j * BLOCK_SIZE, y + i * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, COLORS[tile]);

            } 
        }))
    }
}