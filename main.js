class Main {
    constructor(screen, nextPiece, heldPiece, scoreboard) {
        this.mainCtx = screen.getContext('2d');
        this.scoreboard = scoreboard;
        this.game = new Game(this.mainCtx);
        
        this.nextPieceCtx = nextPiece.getContext('2d');
        this.heldPieceCtx = heldPiece.getContext('2d');

        // controls
        document.addEventListener('keydown', (e) => {
            if (!this.game.gameover && !this.game.paused) {
                switch(e.keyCode) {
                    case 37:
                        this.game.moveHorizontal(false);
                        break;
                    case 38:
                        this.game.hardDrop();
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
                    case 82:
                        this.game.reset();
                        break;
                }
            }

            if (!this.game.gameover && e.keyCode == 80) {
                this.game.paused = this.game.paused ? false : true;
            }
        });
    }

    async mainloop() {

        this.showLogo();

        while (!this.game.gameover) {

            // show next and held pieces
            this.showMenuGrid(this.game.nextPiece.shape, this.nextPieceCtx);
            if (this.game.heldPiece == null) {
                this.showMenuGrid(null, this.heldPieceCtx);
            } else {
                this.showMenuGrid(this.game.heldPiece.shape, this.heldPieceCtx);
            }

            // spawn new piece
            if (this.game.currentPiece == null) {
                this.game.spawnPiece();
            }
            
            // move piece down
            if (!this.game.paused) {
                this.game.moveDown();
            } else {
                this.showPause();
            }
            

            // wait gamespeed for next move
            await sleep(this.game.getSpeed());

        }

        this.showGameOver();
    }
    
    // show methods

    showPause() {
        let ctx = this.mainCtx;
        drawRect(ctx, 1.5 * SQ, 8.5 * SQ, 7 * SQ, 3 * SQ, '#000000');
        ctx.font = '80px monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('PAUSED', 1.7 * SQ, 10.7 * SQ);
    }

    showGameOver() {
        let ctx = this.mainCtx;
        drawRect(ctx, 1.5 * SQ, 7.5 * SQ, 7 * SQ, 5 * SQ, '#000000');
        ctx.font = '80px monospace';
        ctx.fillStyle = '#ffffff'
        ctx.fillText('GAME', 2.9 * SQ, 9.75 * SQ);
        ctx.fillText('OVER', 2.9 * SQ, 11.5 * SQ);
    }

    showLogo () {
        let canvas = document.getElementById("logo");
        let ctx = canvas.getContext('2d');
        const sqs = 14

        drawRect(ctx, 0, 0, sqs * 7, sqs * 37, COLORS[0]);

        LOGO.forEach( (row, i) => row.forEach( (tile, j) => {
            if (tile == 1) {
                drawRect(ctx, sqs + (j * sqs), sqs + (i * sqs), sqs, sqs, COLORS[Math.floor(Math.random() * (COLORS.length - 1) + 1)]);
            }
        }));
    }

    showMenuGrid(shape, ctx) {
        // draw bg
        drawRect(ctx, 0, 0, 180, 180, COLORS[0]);

        // exit for null shape
        if (shape == null) return;

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

        // draw shape
        dispShape.forEach( (row, i) => row.forEach( (tile, j) => {
            if (tile !== 0) {
                drawRect(ctx, x + j * SQ, y + i * SQ, SQ, SQ, COLORS[tile]);
            }
        }));
    }
}

// setup game
let screen = document.getElementById('grid');
let nextPiece = document.getElementById('next-piece');
let heldPiece = document.getElementById('held-piece');
let scoreboard = document.getElementById('scoreboard');
let game = new Main(screen, nextPiece, heldPiece, scoreboard);

game.mainloop();