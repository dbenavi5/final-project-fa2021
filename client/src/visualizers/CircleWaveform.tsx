// 3rd party library imports
import * as P5 from 'p5';
import * as Tone from 'tone';
import { Particle } from './particles/Particles'

// project imports
import { Visualizer } from '../Visualizers';


const particles: Particle[] = [];  // <- initialize empty array to create particles.
const createParticle = (p5: P5, analyzer: Tone.Analyser): void => {
    const particle = new Particle(p5);
    particles.push(particle);
    for (let p = particles.length - 1; p>= 0; p--) {
        if (!particles[p].edges(p5)) {
            particles[p].update();
        particles[p].show(p5);
        } else {
            particles.slice(p, 1);
        }
    }
};

export const CircleWaveformVisualizer = new Visualizer (
    'Circle Waveform',
    (p5: P5, analyzer: Tone.Analyser) => {
        
        p5.angleMode(p5.DEGREES);
        p5.stroke(255);
        p5.noFill();
        p5.translate(p5.width / 2, p5.height / 2);
        const values = analyzer.getValue();

        for (let k = 0; k < 25; k++) {      // <- first for loop changes background color

            let r = p5.map(p5.sin(p5.frameCount / 2), -1, 1, 100, 200);
            let g = p5.map(k, 100, 500, 10, 255);
            let b = p5.map(p5.cos(p5.frameCount), -1, 1, 100, 200);

            p5.background(r, g, b);

            for (let j = -1; j <= 1; j += 2) {      // <- inner loop
                p5.beginShape();
                p5.strokeWeight(3);
                for (let i = 0; i < values.length; i++) {        // <- second inner loop
                    const index = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));
                    const amp = values[index] as number;
                    const radius = p5.map(amp, -1, 1, 10, 350);

                    const x = radius * p5.sin(i) * j;
                    const y = radius * p5.cos(i);
                    // Place vertex
                    p5.vertex(x, y);
                }
                p5.endShape();
            }
        }       // <- end of first loop
        // create new particle
        createParticle(p5,analyzer);
    },
);