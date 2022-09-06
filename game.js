class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.currentPiece = null;
        this.grid = Array(ROWS).fill(Array(COLS).fill(0));
    }

    showSelf() {
        // show set pieces and black background tiles
        this.grid.forEach( (row, i) => row.forEach( (tile, j) => {
            drawRect(this.ctx, j * BLOCK_SIZE, i * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, COLORS[tile]);
            console.log(`colored tile [${i}][${j}] ${COLORS[tile]}`);
        }));

        // show current piece
        if (this.currentPiece != null) {
            this.currentPiece.showSelf();
        }
    }

    spawnPiece() {
        // get random shape
        let shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        this.currentPiece = new Piece(shape, this.ctx);
    }

    // return true if collision occurs
    // x and y are pos of piece at location of possible collision
    detectCollision(x, y) {
        const shape = this.currentPiece.shape;
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape.length; j++) {
                // p and q are locations of each tile in piece
                let p = x + i;
                let q = y + j;
                // check for in bounds (q can never be less than zero)
                if (p >= 0 && p < COLS && q < ROWS) {
                    // check tile for piece
                    if (this.grid[p][q] != 0) {
                        return true;
                    }
                } else {
                    // return true for hitting the walls or floor
                    return true;
                }
            }
        }
        // no collision occurs
        return false;
    }

    // returns point value
    clearFullRows() {
        let linesCleared = 0;
        this.grid.forEach( (row, i) => {
            if (row[0] != 0 &&
                row[1] != 0 &&
                row[2] != 0 &&
                row[3] != 0 &&
                row[4] != 0 &&
                row[5] != 0 &&
                row[6] != 0 &&
                row[7] != 0 &&
                row[8] != 0 &&
                row[9] != 0) {
                    linesCleared++;
                    // if there are no zeros, make the rows above "fall" onto the others, deleting the full row
                    for (let c = i; c <= 0; c--) {
                        if (c == 0) {
                            this.grid[c] = this.grid[c].map( tile => tile = 0 );
                        } else {
                            this.grid[c] = this.grid[c].map( (tile, j) => tile = this.grid[c][j] );
                        }
                    }
                }
        });
        // calculate score of move
        switch (linesCleared) {
            case 0:
                return 0;
            case 1:
                return 100;
            case 2:
                return 300;
            case 3:
                return 500;
            case 4:
                return 800;
        }
    }

    movePieceDown() {
        if (!this.detectCollision(this.currentPiece.x, this.currentPiece.y + 1)) {
            // move down if no collision
            this.currentPiece.y++;
        } else {
            // set piece on grid if it collides with floor
            this.currentPiece.forEach( (row, i) => row.forEach( (tile, j) => {
                if (tile != 0) {
                    this.grid[y + i][x + j] = tile;
                }
            }));
            // clear curren piece
            this.currentPiece = null;
        }
    }

    rotatePieceClockwise() {
        let shape = this.currentPiece.shape;
        // transpose shape array
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < i; j++) {
               const temp = shape[i][j];
               shape[i][j] = shape[j][i];
               shape[j][i] = temp;
            }
        }
        // reverse every row in shape array
        shape.map( row => row.reverse());
        this.currentPiece.shape = shape;
    }
}