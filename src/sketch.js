var cars = [];

function setup() {
    createCanvas(900, 900);
    rectMode(CENTER);

    createCheckpoints(PI / 15);

    initNeat();
    startEvaluation();
}

function draw() {
    background(61);

    // scale(2);
    // translate(-car.position.x + 225, -car.position.y + 225);

    drawWalls();
    drawCheckpoints();
    drawCars();

    for (let i = 0; i < 10; i++) {
        cars.map(car => car.update());
    }

    if (cars.every(car => !car.running)) {
        endEvaluation();
    }
}