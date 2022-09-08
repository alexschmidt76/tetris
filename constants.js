// grid for blocks
const BLOCK_SIZE = 36;
const ROWS = 20; // height is 700
const BUFFER_ZONE = 4;
const COLS = 10; // width is 350

// game constants
const REWARD = 10;

// shapes of pieces in array form
const SHAPES = [
    // I
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
    ],
    // L
    [
        [0, 0, 0],
        [2, 2, 2],
        [2, 0, 0]
    ],
    // J
    [
        [0, 0, 0],
        [3, 3, 3],
        [0, 0, 3],
    ],
    // S
    [
        [0, 0, 0],
        [0, 4, 4],
        [4, 4, 0],
    ],
    // Z
    [
        [0, 0, 0],
        [5, 5, 0],
        [0, 5, 5],
    ],
    // T
    [
        [0, 0, 0],
        [6, 6, 6],
        [0, 6, 0],
    ],
    // O
    [
        [7, 7],
        [7, 7]
    ]
]

// colors of each shape
const COLORS = [
    "#000000",
    "#00ffff",
    "#0000ff",
    "#ffaa00",
    "#00ff00",
    "#ff0000",
    "#9900ff",
    "#ffff00"
];

// utility functions
function drawRect(ctx, x, y, width, height, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(x, y, width, height);
    ctx.fill();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}