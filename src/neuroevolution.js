var Neat    = neataptic.Neat;
var methods = neataptic.methods;
var architect = neataptic.architect;

var neat;

function initNeat() {
    neat = new Neat(5, 1, null, 
    {
        mutation: [
            // methods.mutation.ADD_NODE,
            // methods.mutation.SUB_NODE,
            // methods.mutation.ADD_CONN,
            // methods.mutation.SUB_CONN,
            methods.mutation.MOD_WEIGHT,
            methods.mutation.MOD_BIAS,
            methods.mutation.MOD_ACTIVATION,
            // methods.mutation.ADD_GATE,
            // methods.mutation.SUB_GATE,
            // methods.mutation.ADD_SELF_CONN,
            // methods.mutation.SUB_SELF_CONN,
            // methods.mutation.ADD_BACK_CONN,
            // methods.mutation.SUB_BACK_CONN
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

        const car = new Car(random(580, 630), 400, -PI/2, genome);
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