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