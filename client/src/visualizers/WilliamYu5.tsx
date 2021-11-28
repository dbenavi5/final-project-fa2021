// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const KaleidoscopeVisualizer = new Visualizer(
  'Kaleidoscope',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.01);
    p5.stroke(255, 255, 255, 255);
    p5.noFill();

    const values = analyzer.getValue();
    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      if (i < values.length && amplitude > (values[i+1] as number) * 100) {
        p5.stroke(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
      }
      const x = Math.cos(i) * 1000 * (amplitude - .01) + width / 2;
      const y = Math.sin(i) * 1000 * (amplitude - .01) + height / 2;
      // Place vertex
      p5.vertex(x, y);
    }
    p5.endShape();
  },
);
