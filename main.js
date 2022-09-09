const screen1 = document.getElementById('screen1');
const ctx1 = screen1.getContext('2d');

const game1 = new Game(ctx1);
let gameover = false;

document.addEventListener("keypress", (e) => {
    switch (e.code) {
        case "KeyW":
            game1.hardDrop();
        case "KeyD":
            game1.movePieceRight();
            break;
        case "KeyA":
            game1.movePieceLeft();
            break;
            break;
        case "KeyE":
            game1.rotatePiece(true);
            break;
        case "KeyQ":
            game1.rotatePiece(false);
            break;
        case "KeyF":
            game1.holdPiece();
            break;
    }
})

async function mainloop() {
    while (!game1.gameOver) {
        game1.spawnPiece();
        while (game1.currentPiece != null) {
            game1.showSelf();
            game1.movePieceDown();
            await sleep(game1.calcSpeed());
        }
        game1.showSelf();
    }
}

mainloop();

