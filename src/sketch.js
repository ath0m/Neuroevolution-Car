var world;
var cars = [];

var canvas;

function setup() {
    canvas = createCanvas(540, 540);
    canvas.parent('canvascontainer');

    rectMode(CENTER);

    initNeat();

    initControls();
    worldSelected();

    startEvaluation();
}

var timer = 0;

function draw() {
    background(61);

    scale(0.6);

    let cycles = speedSlider.value();
    speedSpan.html(cycles);
  
    if (follow) { followBestCar(cars); }
    if (drawingCheckpoints) { drawCheckpoints(checkpoints); }

    drawWalls(world.walls);
    drawCars(cars, world.walls);

    for (let i = 0; i < cycles; i++) { cars.map(car => car.update()); }

    if (frameCount - timer >= world.timeout && training) {
        console.log('Timeout')
        cars.map(car => car.running = false);
    }

    if (training) { updateScores(); }

    if (cars.every(car => !car.running)) {
        if (training) {
            endEvaluation();
            timer = frameCount;
        } else {
            runBestModel();
        }
    }
}

function keyPressed() {
    control();
}