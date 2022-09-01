// grid for blocks
const BLOCK_SIZE = 35;
const ROWS = 20; // height is 700
const COLS = 10; // width is 350

// game constants
const CLOCK = 1000;
const REWARD = 10;

//

// shapes of pieces in array form
const SHAPES = [
    // I
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [I, I, I, I],
        [0, 0, 0, 0],
    ],
    // L
    [
        [0, 0, 0],
        [L, L, L],
        [L, 0, 0]
    ],
    // J
    [
        [0, 0, 0],
        [J, J, J],
        [0, 0, J],
    ],
    // S
    [
        [0, 0, 0],
        [0, S, S],
        [S, S, 0],
    ],
    // Z
    [
        [0, 0, 0],
        [Z, Z, ],
        [0, Z, Z],
    ],
    // T
    [
        [0, 0, 0],
        [T, T, T],
        [0, T, 0],
    ],
    // O
    [
        [O, O],
        [O, O]
    ]
]

// colors of each shape
const COLORS = {
    I: "#00ffff",
    J: "#0000ff",
    L: "#ffaa00",
    S: "#00ff00",
    Z: "#ff0000",
    T: "#9900ff",
    O: "#ffff00"
}

// utility functions
function drawRect(ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.rect(x, y, width, height);
    ctx.fill();
}