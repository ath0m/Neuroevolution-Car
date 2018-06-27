let speedSlider;
let speedSpan;
let highScoreSpan;
let highestScoreSpan;
let worldsSelect;
let modelsSelect;
let generationSpan;
let timerSpan;
let networkGraphSVG;

var debug = false;
var drawingCheckpoints = false;
var follow = false;
var pause = false;
var training = true;
var visualise = false;
var visualiseBest = false;

let highScore = 0;
var highestScore = 0;
var highestScoreModel = undefined;

function initControls() {
    speedSlider = select('#speedSlider');
    speedSpan = select('#speed');
    generationSpan = select('#generation');
    highScoreSpan = select('#hs');
    highestScoreSpan = select('#ahs');
    timerSpan = select('#timer');

    worldsSelect = select('#worlds');
    worldsSelect.changed(worldSelected);

    modelsSelect = select('#models');

    networkGraphSVG = select('.draw');
}

function worldSelected() {
    switch (worldsSelect.value()) {
        case "1":
            world = world1;
            break;
        case "2":
            world = world2;
            break;
        case "3":
            world = world3;
            break;
        default:
            world = world1;
            break;
    }

    highScore = 0;
    highestScore = 0;
    highestScoreCar = undefined;

    cars.map(car => car.running = false);
}

function control() {
    switch (key) {
        case 'C':
            drawingCheckpoints = !drawingCheckpoints;
            break;
        case 'N':
            cars.map(car => car.running = false);
            break;
        case 'F':
            follow = !follow;
            break;
        case 'P':
            pause = !pause;
            pause ? noLoop() : loop();
            break;
        case 'D':
            debug = !debug;
            break;
        case 'S':
            if (highestScoreModel) { saveJSON(highestScoreModel, 'brain.json'); }
            break;
        case 'R':
            highScore = 0;
            highestScore = 0;
            highestScoreCar = undefined;

            initNeat();
            startEvaluation();
            break;
        case 'T':
            training = !training;
            cars.map(car => car.running = false);
            break;
        case 'V':
            visualise = true;
            loop();
            break;
        case 'W':
            visualiseBest = true;
            loop();
            break;
        case 'E':
            networkGraphSVG.html('');
            break;
    }
}

function updateScores() {
    const best = neat.getFittest();
    highScoreSpan.html(best.score);
    
    if (best.score > highestScore) {
        highestScore = best.score;
        highestScoreModel = best.toJSON();
        highestScoreSpan.html(highestScore);
    }

    generationSpan.html(neat.generation);
    timerSpan.html(frameCount - timer);
}