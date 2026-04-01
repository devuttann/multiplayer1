let players = window.players;

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(30);

    handleInput();

    for (let id in players) {
        let p = players[id];

        if (id === myId) fill(0, 255, 0);
        else fill(255, 0, 0);

        ellipse(p.x, p.y, 40);
    }
}

function handleInput() {
    let dx = 0;
    let dy = 0;

    if (keyIsDown(LEFT_ARROW)) dx = -3;
    if (keyIsDown(RIGHT_ARROW)) dx = 3;
    if (keyIsDown(UP_ARROW)) dy = -3;
    if (keyIsDown(DOWN_ARROW)) dy = 3;

    if (dx !== 0 || dy !== 0) {
        socket.emit("move", { dx, dy });
    }
}
