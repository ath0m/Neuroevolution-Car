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
    if (visualise) {
        let car = cars.reduce((prev, next) => {
            return prev.score > next.score ? prev : next;
        }, cars[0]);
        drawGraph(car.brain.graph(400, 500), '.draw');
        visualise = false;
    }
    if (visualiseBest) {
        let model = Network.fromJSON(highestScoreModel);
        drawGraph(model.graph(400, 500), '.draw');
        visualiseBest = false;
    }

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