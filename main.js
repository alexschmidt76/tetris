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

    showLogo () {
        let canvas = document.getElementById("logo");
        let ctx = canvas.getContext('2d');
        const sqs = 14

        ctx.fillStyle = COLORS[0];
        ctx.fillRect(0, 0, sqs * 7, sqs * 37);
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(0, 0, sqs * 7, sqs * 37)

        LOGO.forEach( (row, i) => row.forEach( (tile, j) => {
            if (tile == 1) {
                ctx.fillStyle = COLORS[Math.floor(Math.random() * (COLORS.length - 1) + 1)];
                ctx.fillRect(sqs + (j * sqs), sqs + (i * sqs), sqs, sqs);
                ctx.strokeStyle = "#000000";
                ctx.strokeRect(sqs + (j * sqs), sqs + (i * sqs), sqs, sqs);
            }
        }));
    }

    showMenuGrid(shape, ctx) {
        // shallow copy shape
        let dispShape = shape.map( row => row.map( x => x ) );
        let x, y;

        // set coords
        switch(dispShape.length) {
            case 4:
                x = 10;
                y = 30;
                break;
            case 2:
                x = 50;
                y = 50;
                break;
            default:
                x = 30;
                y = 50;
                break;
        }

        // draw bg and shape
        ctx.fillStyle = COLORS[0];
        ctx.fillRect(0, 0, 180, 180);
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(0, 0, 180, 180);
        dispShape.forEach( (row, i) => row.forEach( (tile, j) => {
            if (tile != 0) {
                console.log(x, y, i, j)
                drawSquare(ctx, x + j * SQ, y + i * SQ, COLORS[tile]);
            }
        }));
    }

    mainloop() {
        this.showLogo();
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