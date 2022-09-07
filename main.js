const screen1 = document.getElementById('screen1');
const ctx1 = screen1.getContext('2d');

const game1 = new Game(ctx1);
let gameover = false;

document.addEventListener("keypress", (e) => {
    switch (e.code) {
        case "KeyD":
            game1.movePieceRight();
            break;
        case "KeyA":
            game1.movePieceLeft();
            break;
        case "KeyE":
            game1.rotatePieceClockwise();
            break;
        case "KeyQ":
            game1.rotatePieceCounterClockwise();
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
            await sleep(200);
        }
        game1.showSelf();
    }
}

mainloop();

