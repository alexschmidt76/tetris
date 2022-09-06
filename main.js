const screen1 = document.getElementById('screen1');
const ctx1 = screen1.getContext('2d');

const game1 = new Game(ctx1);
let gameover = false;

async function mainloop() {
    game1.spawnPiece();
    while (game1.currentPiece != null) {
        game1.showSelf();
        game1.movePieceDown();
        if (game1.detectCollision(game1.currentPiece.x, game1.currentPiece.y + 1)) {
            game1.currentPiece = null;
        }
        await sleep(1000);
    }
}

mainloop();

