var walls = [
    [0, 0, 0, 900],
    [0, 0, 900, 0],
    [900, 0, 900, 900],
    [0, 900, 900, 900],

    [100, 250, 100, 650],
    [250, 100, 650, 100],
    [800, 250, 800, 650],
    [250, 800, 650, 800],
    [100, 250, 250, 100],
    [650, 100, 800, 250],
    [800, 650, 650, 800],
    [100, 650, 250, 800],

    [275, 350, 275, 550],
    [350, 275, 550, 275],
    [625, 350, 625, 550],
    [350, 625, 550, 625],
    [275, 350, 350, 275],
    [550, 275, 625, 350],
    [625, 550, 550, 625],
    [275, 550, 350, 625]
];

var checkpoints = [];

class Car {
    constructor(x, y, angle = 0.0, genome) {
        this.size = {
            width: 40,
            height: 20
        };
        this.running = true;
        this.position = createVector(x, y);
        this.angle = angle;
        this.velocity = 3;

        this.score = 0;
        this.lastCheckpoint = -1;

        this.sensors = [
            {angle:  0.0       , length: 200},
            {angle:  PI / 7.0  , length: 120},
            {angle: -PI / 7.0  , length: 120},
            {angle:  PI / 4.0  , length: 80},
            {angle: -PI / 4.0  , length: 80}
        ];

        this.brain = genome;
        this.brain.score = 0;
    }

    draw() {
        push();

        stroke(255);
        strokeWeight(3.0);
        noFill();

        translate(this.position.x, this.position.y)
        rotate(this.angle);
        rect(0, 0, this.size.width, this.size.height);

        pop();
    }

    drawSensors() {
        push();

        stroke(255, 255, 255, 100);
        const {x: startX, y: startY} = this.position

        this.sensors.map( ({angle, length}) => {
            const endX = this.position.x + cos(angle + this.angle) * length;
            const endY = this.position.y + sin(angle + this.angle) * length;

            const end = walls.map(wall => collideLineLine(...wall, startX, startY, endX, endY, true))
                            .filter(({x, y}) => x && y)
                            .reduce((prev, next) => {
                                const d0 = dist(startX, startY, prev.x, prev.y);
                                const d1 = dist(startX, startY, next.x, next.y);
                                return (d0 < d1) ? prev : next;
                            }, {x: endX, y: endY});

            line(startX, startY, end.x, end.y);
        });

        pop();
    }

    collision() {
        let {x: posX, y: posY} = this.position;
        const {width: w, height: h} = this.size;

        posX -= w / 2;
        posY -= h / 2;

        const hit = walls.map(wall => collideLineRect(...wall, posX, posY, w, h))
                            .some(x => x);
        
        return hit;
    }

    detect() {
        const {x: startX, y: startY} = this.position

        const dists = this.sensors.map(({angle, length}) => {
            const endX = this.position.x + cos(angle + this.angle) * length;
            const endY = this.position.y + sin(angle + this.angle) * length;

            const distance = walls.map(wall => collideLineLine(...wall, startX, startY, endX, endY, true))
                                .filter(({x, y}) => x && y)
                                .reduce((prev, next) => {
                                    const d = dist(startX, startY, next.x, next.y);
                                    return min(prev, d);
                                }, length);

            return distance / length;
        });

        return dists;
    }

    updateScore() {
        let {x: posX, y: posY} = this.position;
        const {width: w, height: h} = this.size;

        posX -= w / 2;
        posY -= h / 2;

        checkpoints.filter(({coord, i}) => collideLineRect(...coord, posX, posY, w, h))
                    .map(({coord, i}) => {
                        if (i >= (this.lastCheckpoint + 1) % checkpoints.length) {
                            this.score += 1;
                        }
                        this.lastCheckpoint = i;
                    });

        this.brain.score = this.score;
    }

    update() {
        if (!this.running) {
            return;
        }

        let steer = this.think();
        steer = map(steer, 0, 1, -PI/100, PI/100);

        // console.log(steer);
        // steer = constrain(steer, -PI/200, PI/200);

        this.angle += steer;

        let dx = cos(this.angle) * this.velocity;
        let dy = sin(this.angle) * this.velocity;

        this.position.x += dx;
        this.position.y += dy;

        this.updateScore();

        if (this.collision()) {
            this.running = false;
        }
    }

    think() {
        let input = this.detect();

        const [output] = this.brain.activate(input);

        return output;
    }
};

function drawWalls() {
    push();

    stroke(255);
    strokeWeight(2.0);

    walls.map(wall => line(...wall));

    pop();
}

function drawCheckpoints() {
    push();

    stroke(255, 255, 255, 40);

    checkpoints.map(({coord, i}) => {
        line(...coord);
    });

    pop();
}

var Neat    = neataptic.Neat;
var Methods = neataptic.methods;
var Architect = neataptic.architect;

var neat;

function initNEAT() {
    neat = new Neat(5, 1, null, 
    {
        mutation: [
            Methods.mutation.MOD_WEIGHT,
            Methods.mutation.MOD_BIAS,
        ],
        popsize: 10,
        mutationRate: 0.2,
        elitism: 2,
        network: new Architect.Random(5, 3, 1)
    });
}

var cars = [];

function setup() {
    createCanvas(900, 900);
    rectMode(CENTER);

    initNEAT();

    for(var genome in neat.population){
        genome = neat.population[genome];
        const car = new Car(random(675, 750), 450, -PI/2, genome);
        cars.push(car);
    }

    const angle = PI / 15;
    for (let i = 0; i * angle < 2 * PI; i++) {
        const coord = [450, 450, 450 + cos(-angle * i) * 900, 450 + sin(-angle * i) * 900];
        checkpoints.push({coord, i});
    }
}

function draw() {
    background(61);

    // scale(2);
    // translate(-car.position.x + 225, -car.position.y + 225);

    drawWalls();
    drawCheckpoints();

    for (let i = 0; i < 10; i++) {
        cars.map(car => {    
            car.update();
        });
    }

    cars.map(car => {
        car.draw();
        car.drawSensors();
    });

    if (cars.every(car => !car.running)) {
        console.log('Generation:', neat.generation, '- average score:', neat.getAverage());

        neat.sort();
        var newPopulation = [];

        for (var i = 0; i < neat.elitism; i++){
            newPopulation.push(neat.population[i]);
        }

        for(var i = 0; i < neat.popsize - neat.elitism; i++){
            newPopulation.push(neat.getOffspring());
        }
    
        // Replace the old population with the new population
        neat.population = newPopulation;
        neat.mutate();
    
        neat.generation++;

        cars = [];
        for(var genome in neat.population){
            genome = neat.population[genome];
            const car = new Car(random(675, 750), 450, -PI/2, genome);
            cars.push(car);
        }
    }
}