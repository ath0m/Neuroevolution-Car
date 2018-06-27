class Car {
    constructor(x, y, angle = 0.0, genome, scheme = null) {
        this.size = {
            width: 30,
            height: 15
        };
        this.running = true;
        this.position = createVector(x, y);
        this.angle = angle;
        this.velocity = 4;
        this.steerLimit = [-PI/80, PI/80]

        this.score = 0;
        this.lastCheckpoint = -1;

        this.sensors = [
            {angle:  0.0       , length: 200},
            {angle:  PI / 7.0  , length: 150},
            {angle: -PI / 7.0  , length: 150},
            {angle:  PI / 3.0  , length: 70},
            {angle: -PI / 3.0  , length: 70}
        ];

        this.brain = genome;
        this.brain.score = this.score;

        if (scheme) {
            this.size = scheme.size;
            this.velocity = scheme.velocity;
            this.steerLimit = scheme.steerLimit;
            this.sensors = scheme.sensors;
        }
    }

    collision() {
        let {x: posX, y: posY} = this.position;
        const {width: w, height: h} = this.size;

        if (debug) {
            push();
            fill('green');
            ellipse(posX, posY, w * 0.8);
            pop();
        }

        const hit = world.walls.map(wall => collideLineCircle(...wall, posX, posY, w * 0.8))
                            .some(x => x);
        
        return hit;
    }

    detect() {
        const {x: startX, y: startY} = this.position

        const dists = this.sensors.map(({angle, length}) => {
            const endX = this.position.x + cos(angle + this.angle) * length;
            const endY = this.position.y + sin(angle + this.angle) * length;

            const distance = world.walls.map(wall => collideLineLine(...wall, startX, startY, endX, endY, true))
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

        let steer = (this.think() - 1.0) / 100.;

        if (Number.isNaN(steer)) {
            this.running = false;
            return;
        }

        steer = constrain(steer, 0, 1);
        steer = map(steer, 0, 1, ...this.steerLimit);

        this.angle -= steer;

        let dx = cos(this.angle) * this.velocity;
        let dy = sin(this.angle) * this.velocity;

        // console.log(this.angle, dx, dy);
        // console.log(this.angle);

        // dx = constrain(dx, -10, 10);
        // dy = constrain(dy, -10, 10);

        this.position.x += dx;
        this.position.y += dy;

        // this.updateScore();

        if (this.collision()) {
            this.running = false;
        }

        if (this.running) {
            this.score += 1;
            this.brain.score = this.score;
        }
    }

    think() {
        let input = this.detect();

        const [output] = this.brain.activate(input);

        return output;
    }
};