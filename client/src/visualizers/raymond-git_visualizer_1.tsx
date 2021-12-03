// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';
// project imports
import { Visualizer } from '../Visualizers';

export const RaymondVisualizers = new Visualizer(
  'Raymond Waveform',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);
    p5.strokeWeight(dim * 0.01); //This is the size of the stroke which is the white ling
    p5.stroke(255, 255, 255, 255); //Commenting this out will give no line when playing music, so make sure to have stroke
    p5.translate(700, 0, 800);

    const values = analyzer.getValue();

    let offset = 0;
    const frame = p5.frameCount / 100;
    p5.colorMode(p5.HSB);

    for (let y = 0; y < p5.frameCount; y += frame) {
      let h = y / height * 360; //Depending on the number it changes a different hue color faster or slower
      p5.fill(p5.abs(h - offset) % 360, 100, 200);
      p5.noStroke();
      p5.rect(-700, y - frame, width, y);
    }
    offset = offset - 5;

    p5.beginShape();
    for (let i = 0; i < 360; i++) {

      const amplitude = values[i] as number * 20; //The higher the number the bigger the amplitude(vibrations)
      p5.stroke(237, 34, 93);
      //The vertex creates the shape of the star
      p5.vertex(10 * 3 + amplitude, 35 * 3 + amplitude);
      p5.vertex(90 * 3 + amplitude, 35 * 3 + amplitude);
      p5.vertex(10 * 3 + amplitude, 65 * 3 + amplitude);
      p5.vertex(90 * 3 + amplitude, 65 * 3 + amplitude);
      p5.vertex(35 * 3 + amplitude, 10 * 3 + amplitude);
      p5.vertex(35 * 3 + amplitude, 90 * 3 + amplitude);
      p5.vertex(65 * 3 + amplitude, 10 * 3 + amplitude);
      p5.vertex(65 * 3 + amplitude, 90 * 3 + amplitude);
    }
    p5.endShape();
  }
);