class Piece  {
    constructor(shape, ctx) {
        this.shape = shape;
        this.ctx = ctx;
        // x and y are upper left of square
        this.x = COLS / 2 - Math.floor(this.shape.length / 2);
        this.y = 0;
    }

    showSelf() {
        this.shape.forEach( (row, i) => row.forEach( (tile, j) => {
            if (tile != 0) {
                drawRect(this.ctx, (this.x + j) * BLOCK_SIZE, (this.y + i) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, COLORS[tile]);
            } 
        }))
    }
}