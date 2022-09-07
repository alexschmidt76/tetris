class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.currentPiece = null;
        this.heldPiece = null;
        this.nextPiece = new Piece(SHAPES[Math.floor(Math.random() * SHAPES.length)], this.ctx);
        this.gameOver = false;
        this.score = 0;
        // build grid
        this.grid = [];
        for (let i = 0; i < ROWS + BUFFER_ZONE; i++) {
            let row = [];
            for (let j = 0; j < COLS; j++) {
                row.push(0);
            }
            this.grid.push(row);
        }
    }

    // used for styling remove when game complete
    showGridLines() {
        this.grid.forEach( (row, i) => {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * BLOCK_SIZE);
            this.ctx.lineTo(COLS * BLOCK_SIZE, i * BLOCK_SIZE);
            this.ctx.stroke();
            if (i == 0) {
                row.forEach( (col, j) => {
                    this.ctx.beginPath();
                this.ctx.moveTo(j * BLOCK_SIZE, 0);
                this.ctx.lineTo(j * BLOCK_SIZE, (ROWS + BUFFER_ZONE) * BLOCK_SIZE);
                this.ctx.stroke();
                })
            }
        });
    }

    showUI() {
        // background
        drawRect(this.ctx, 0, 0, COLS * BLOCK_SIZE, BUFFER_ZONE * BLOCK_SIZE, '#a6a6a6');

        // next piece container
        drawRect(this.ctx, (BLOCK_SIZE * 7) + 18, BLOCK_SIZE + 18, 72, 72, COLORS[0]);
        // next piece
        if (this.currentPiece != null) {
            let x = (BLOCK_SIZE * 8);
            let y = (BLOCK_SIZE * 2);
            const MINI_BLOCK_SIZE = BLOCK_SIZE / this.nextPiece.shape.length;
            this.nextPiece.shape.forEach( (row, i) => row.forEach( (tile, j) => {
                if (tile != 0) {
                    drawRect(this.ctx, x + j * MINI_BLOCK_SIZE, y + i * MINI_BLOCK_SIZE, MINI_BLOCK_SIZE, MINI_BLOCK_SIZE, COLORS[tile]);
                }
            }));
        }
    }

    showSelf() {
        // show set pieces and black background tiles
        this.grid.forEach( (row, i) => row.forEach( (tile, j) => {
                drawRect(this.ctx, j * BLOCK_SIZE, (i) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, COLORS[tile]);
        }));

        // show current piece
        if (this.currentPiece != null) {
            this.currentPiece.showSelf();
        }

        // show ui
        this.showUI();

        // show grid lines
        this.showGridLines();
    }

    spawnPiece() {
        this.currentPiece = this.nextPiece;
        // get random shape for next piece
        let shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        this.nextPiece = new Piece(shape, this.ctx);
    }

    holdPiece() {
        if (this.heldPiece == null) {
            this.heldPiece = this.currentPiece;
            this.currentPiece = this.nextPiece;
            let shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
            this.nextPiece = new Piece(shape, this.ctx);
        } else {
            let temp = this.heldPiece;
            this.heldPiece = this.currentPiece;
            temp.x = this.currentPiece.x;
            temp.y = this.currentPiece.y;
            this.currentPiece = temp;
        }
    }

    // return true if collision occurs
    // x and y are pos of piece at location of possible collision
    detectCollision(x, y) {
        const shape = this.currentPiece.shape;
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape.length; j++) {
                // dont check empty tiles
                if (shape[i][j] != 0) {
                    // p and q are locations of each tile in piece
                    let p = x + j;
                    let q = y + i;
                    // check for in bounds (q can never be less than zero)
                    if (p >= 0 && p < COLS && q < ROWS + BUFFER_ZONE) {
                        // check tile for piece
                        if (this.grid[q][p] != 0) {
                            console.log('piece hit at ' + p + ' ' + q)
                            if (q <= BUFFER_ZONE) {
                                console.log('game over')
                                this.gameOver = true;
                            }
                            return true;
                        }
                    } else {
                        // return true for hitting the walls or floor
                        console.log('floor hit')
                        return true;
                    }
                }
            }
        }
        // no collision occurs
        console.log('no collision');
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
                    console.log(linesCleared)
                    // if there are no zeros, make the rows above "fall" onto the others, deleting the full row
                    for (let c = i; c >= BUFFER_ZONE; c--) {
                        if (c == BUFFER_ZONE) {
                            this.grid[c] = this.grid[c].map( tile => tile = 0 );
                        } else {
                            console.log('line cleared')
                            this.grid[c] = this.grid[c].map( (tile, j) => tile = this.grid[c - 1][j] );
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
            this.currentPiece.shape.forEach( (row, i) => row.forEach( (tile, j) => {
                if (tile != 0) {
                    this.grid[this.currentPiece.y + i][this.currentPiece.x + j] = tile;
                }
            }));
            
            // look for clearable rows
            this.score += this.clearFullRows();

            // clear current piece
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
        shape = shape.map( row => row.reverse());
        this.currentPiece.shape = shape;

        this.showSelf();
    }

    rotatePieceCounterClockwise() {
        let shape = this.currentPiece.shape;
        // clockwise three times
        for (let i = 0; i < 3; i++) {
            // transpose shape array
            for (let i = 0; i < shape.length; i++) {
                for (let j = 0; j < i; j++) {
                const temp = shape[i][j];
                shape[i][j] = shape[j][i];
                shape[j][i] = temp;
                }
            }
            // reverse every row in shape array
            shape = shape.map( row => row.reverse());
        }
        this.currentPiece.shape = shape;

        this.showSelf();
    }

    movePieceRight() {
        if (!this.detectCollision(this.currentPiece.x + 1, this.currentPiece.y)) {
            this.currentPiece.x++;
        }
        this.showSelf();
    }

    movePieceLeft() {
        if (!this.detectCollision(this.currentPiece.x - 1, this.currentPiece.y)) {
            this.currentPiece.x--;
        }
        this.showSelf();
    }
}