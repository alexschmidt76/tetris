const screen1 = document.getElementById('screen1');
const ctx1 = screen1.getContext('2d');

const game1 = new Game(ctx1);
let gameover = false;

async function mainloop() {
    while (!game1.gameOver) {
        console.log(game1.gameOver)
        game1.spawnPiece();
        while (game1.currentPiece != null) {
            game1.showSelf();
            game1.movePieceDown();
            await sleep(50);
        }
        game1.showSelf();
    }
}

mainloop();

