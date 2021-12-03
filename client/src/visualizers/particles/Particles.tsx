import P5, { Vector } from 'p5';

export class Particle {
    position: P5.Vector;
    velocity: P5.Vector;
    acceleration: P5.Vector;
    pSize: number;
    color: number[];

    constructor(p5: P5) {
        this.position = Vector.random2D().mult(140);                                    // <- size of the circle
        this.velocity = Vector.random2D().mult(0);                                      // <- empty vector
        this.acceleration = this.position.copy().mult(p5.random(0.0001, 0.00001));      // <- must be smaller than this.position
        this.pSize = p5.random(4, 6);                                                   // <- size of particles
        this.color = [p5.random(100, 255), p5.random(200, 255), p5.random(150, 255)];   // <- random color for particles
    }

    update(condition: boolean) {
        this.velocity.add(this.acceleration);       // <- add acceleration to velocity
        this.position.add(this.velocity);           // <- add velocity to position
        if (condition) {
            this.position.add(this.velocity);
            this.position.add(this.velocity);
            this.position.add(this.velocity);
        }
    }

    edges(p5: P5) {
        if (this.position.x < -p5.width / 2 || this.position.x > p5.width / 2 ||
            this.position.y < -p5.height / 2 || this.position.y > p5.height / 2) {
            return true;
        } else {
            return false;
        }
    }

    show(p5: P5) {
        p5.noStroke();
        p5.fill(this.color);
        p5.ellipse(this.position.x, this.position.y, this.pSize);   // <- creates fix particle circle
    }
}
