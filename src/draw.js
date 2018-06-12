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

function drawCar(car) {
    push();

    stroke(255);
    strokeWeight(3.0);
    noFill();

    translate(car.position.x, car.position.y)
    rotate(car.angle);
    rect(0, 0, car.size.width, car.size.height);

    pop();
}

function drawSensors(car) {
    push();

    stroke(255, 255, 255, 100);
    const {x: startX, y: startY} = car.position

    car.sensors.map( ({angle, length}) => {
        const endX = car.position.x + cos(angle + car.angle) * length;
        const endY = car.position.y + sin(angle + car.angle) * length;

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

function drawCars() {
    cars.map(car => {
        drawCar(car);
        drawSensors(car);
    });
}