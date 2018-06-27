var checkpoints = [];

function createCheckpoints(angle) {
    for (let i = 0; i * angle < 2 * PI; i++) {
        const coord = [450, 450, 450 + cos(-angle * i) * 900, 450 + sin(-angle * i) * 900];
        checkpoints.push({
            coord,
            i
        });
    }
}