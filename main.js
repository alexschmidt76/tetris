class Main {
    constructor(screen, nextPiece, heldPiece, scoreboard) {
        this.mainCtx = screen.getContext('2d');
        this.scoreboard = scoreboard;
        this.game = new Game(this.mainCtx);
        
        this.nextPieceCtx = nextPiece.getContext('2d');
        this.heldPieceCtx = heldPiece.getContext('2d');

        // controls
        document.addEventListener('keydown', (e) => {
            switch(e.keyCode) {
                case 37:
                    this.game.moveHorizontal(false);
                    break;
                case 39:
                    this.game.moveHorizontal(true);
                    break;
                case 40:
                    this.game.moveDown();
                    break;
                case 90:
                    this.game.rotate(false);
                    break;
                case 88:
                    this.game.rotate(true);
                case 67:
                    this.game.holdPiece();
                    break;
            }
        });
    }

    showMenuGrid(shape, ctx) {
        // shallow copy shape
        let dispShape = shape.map( row => row.map( x => x ) );

        // set square size for display
        let sq = dispShape.length == 4 ? 36 : 30;

        // refactor shape array for display (adds 'ring' of 0's around shape)
        if (dispShape.length == 2) {
            dispShape = [
                [0, 0, 0, 0, 0],
                [0, 7, 7, 0, 0],
                [0, 7, 7, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ];
        } else {
            dispShape.forEach( row => {
                row.unshift(0);
                row.push(0);
            });
            let emptyRow = []
            for (let i = 0; i < dispShape[0].length; i++) {
                emptyRow.push(0);
            }
            dispShape.unshift(emptyRow);
            dispShape.push(emptyRow);
        }
        // show shape in canvas
        dispShape.forEach( (row, i) => row.forEach( (tile, j) => {
            drawSquare(ctx, j * sq, i * sq, COLORS[tile]);
        }));
    }

    mainloop() {
        let intervalID = setInterval( () => {
            console.log('loop')

            // show next and held pieces
            this.showMenuGrid(this.game.nextPiece.shape, this.nextPieceCtx);
            if (this.game.heldPiece == null) {
            this.showMenuGrid([
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ], this.heldPieceCtx);
            } else {
                this.showMenuGrid(this.game.heldPiece.shape, this.heldPieceCtx);
            }

            // main gameloop
            if (this.game.gameover) {
                clearInterval(intervalID);
            } else {
                // spawn new piece
                if (this.game.currentPiece == null) {
                    this.game.spawnPiece();
                }
                
                // move piece down
                this.game.moveDown();
            }
        }, GAME_CLOCK);
    }
}

let screen = document.getElementById('grid');
let nextPiece = document.getElementById('next-piece');
let heldPiece = document.getElementById('held-piece');
let scoreboard = document.getElementById('scoreboard');
let game = new Main(screen, nextPiece, heldPiece, scoreboard);

game.mainloop();