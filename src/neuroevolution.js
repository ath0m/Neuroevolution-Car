var Neat    = neataptic.Neat;
var methods = neataptic.methods;
var architect = neataptic.architect;
var Network = neataptic.Network;

var neat;

function initNeat() {
    neat = new Neat(5, 1, null, 
    {
        mutation: [
            methods.mutation.ADD_NODE,
            methods.mutation.SUB_NODE,
            methods.mutation.ADD_CONN,
            methods.mutation.SUB_CONN,
            methods.mutation.MOD_WEIGHT,
            methods.mutation.MOD_BIAS,
            methods.mutation.MOD_ACTIVATION,
            methods.mutation.ADD_GATE,
            methods.mutation.SUB_GATE,
        ],
        popsize: 20,
        mutationRate: 0.5,
        elitism: 5,
        network: new architect.Random(5, 3, 1)
    });
}

function startEvaluation() {
    cars = [];

    for(var genome in neat.population){
        genome = neat.population[genome];

        const {angle: startAngle, x: startX, y: startY} = world.beginning;

        const car = new Car(random(...startX), random(...startY), startAngle, genome, world.car);
        cars.push(car);
    }
}

function endEvaluation() {
    console.log('Generation:', neat.generation, '- average score:', neat.getAverage());

    neat.sort();
    var newPopulation = [];

    for (var i = 0; i < neat.elitism; i++){
        newPopulation.push(neat.population[i]);
    }

    for(var i = 0; i < neat.popsize - neat.elitism; i++){
        newPopulation.push(neat.getOffspring());
    }

    neat.population = newPopulation;
    neat.mutate();

    neat.generation++;

    startEvaluation();
}

function runBestModel() {

    var model;
    switch (modelsSelect.value()) {
        default:
        case "0":
            model = highestScoreModel;
            break;
        case "1":
            model = JSON.parse(model1);
            break;
        case "2":
            model = JSON.parse(model2);
            break;
        case "3":
            model = JSON.parse(model3);
            break;
    }

    cars = [];

    for (var i = 0; i < 1; i++) {
        var brain = Network.fromJSON(model);
        const {angle: startAngle, x: startX, y: startY} = world.beginning;

        const car = new Car(random(...startX), random(...startY), startAngle, brain, world.car);
        cars.push(car);
    }
}