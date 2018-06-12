var Neat    = neataptic.Neat;
var Methods = neataptic.methods;
var Architect = neataptic.architect;

var neat;

function initNeat() {
    neat = new Neat(5, 1, null, 
    {
        mutation: [
            Methods.mutation.MOD_WEIGHT,
            Methods.mutation.MOD_BIAS,
        ],
        popsize: 10,
        mutationRate: 0.4,
        elitism: 2,
        network: new Architect.Random(5, 3, 1)
    });
}

function startEvaluation() {
    cars = [];

    for(var genome in neat.population){
        genome = neat.population[genome];

        const car = new Car(random(675, 750), 450, -PI/2, genome);
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