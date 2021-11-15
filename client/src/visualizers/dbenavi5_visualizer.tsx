// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';
import { Particle } from './particles/Particles'

// project imports
import { Visualizer } from '../Visualizers'

// const fft = new Tone.FFT();
const particles: Particle[] = [];  // <- initialize empty array to create particles.
export const createParticle = (p5: P5, analyzer: Tone.Analyser): void => {
    const particle = new Particle(p5);
    const values = analyzer.getValue();
    // console.log(values);
    particles.push(particle);
    for (let p = particles.length - 1; p >= 0; p--) {
        const amp = values[p];
        if (!particles[p].edges(p5)) {
            particles[p].update(amp > 0.1);
            particles[p].show(p5);
        } else {
            particles.splice(p, 1);
        }
    }
};

// const detectBeat = (beat: Tone.FFT) => {
    
// }

export const CircleWaveformVisualizer = new Visualizer(
    'Circle Waveform',
    (p5: P5, analyzer: Tone.Analyser) => {

        p5.angleMode(p5.DEGREES);
        p5.stroke(255);
        p5.noFill();
        p5.translate(p5.width / 2, p5.height / 2);
        const values = analyzer.getValue();

        for (let k = 0; k < 25; k++) {      // <- first for loop changes background color
            //map function has 5 arguements.      0 -> length                0 -> width of canvas
            // map([the thing u want to map],[range 1],[range 2],[desired range 1], [desired range 1])
            let r = p5.map(p5.sin(p5.frameCount / 2), -1, 1, 0, 200);
            let g = p5.map(k, 100, 250, 0, 255);
            let b = p5.map(p5.cos(p5.frameCount), -1, 1, 0, 200);

            p5.background(r, g, b);

            for (let j = -1; j <= 1; j += 2) {      // <- inner loop
                p5.beginShape();
                p5.strokeWeight(3);
                for (let i = 0; i < values.length; i++) {        // <- second inner loop
                    const index = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));
                    const amp = values[index] as number*2;
                    // console.log('amp',amp);
                    const radius = p5.map(amp, -1, 1, 80, 200);

                    const x = radius * p5.sin(i) * j;
                    const y = radius * p5.cos(i);
                    // Place vertex
                    p5.vertex(x, y);
                }
                p5.endShape();
            }
        }       // <- end of first loop
        createParticle(p5, analyzer);
    },
);