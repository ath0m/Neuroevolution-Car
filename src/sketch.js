var cars = [];

let speedSlider;
let speedSpan;
let highScoreSpan;
let allTimeHighScoreSpan;

let highScore = 0;

let runBest = false;
let runBestButton;

function setup() {
    var canvas = createCanvas(900, 900);
    canvas.parent('canvascontainer');
    rectMode(CENTER);

    speedSlider = select('#speedSlider');
    speedSpan = select('#speed');
    highScoreSpan = select('#hs');
    allTimeHighScoreSpan = select('#ahs');
    runBestButton = select('#best');
    // runBestButton.mousePressed(toggleState);

    createCheckpoints(PI / 25);

    initNeat();
    startEvaluation();

}

function draw() {
    background(61);

    let cycles = speedSlider.value();
    speedSpan.html(cycles);
  

    // scale(2);
    // translate(-car.position.x + 225, -car.position.y + 225);

    lines.map(l => line(...l));

    drawWalls();
    // drawCheckpoints();
    drawCars();

    for (let i = 0; i < cycles; i++) {
        cars.map(car => car.update());
    }

    if (cars.every(car => !car.running)) {
        endEvaluation();
    }
}

var lastPoint = null;
var lines = [];

function mouseClicked() {
    let x = mouseX;
    let y = mouseY;

    if (lastPoint) {
        lines.push([...lastPoint, x, y]);
    } 

    lastPoint = [x, y]
}

function keyPressed() {
    var jsonLines = JSON.stringify(lines);
    console.log(jsonLines);

}