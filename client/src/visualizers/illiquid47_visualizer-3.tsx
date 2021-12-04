// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';
 
export const trippyVisualizer = new Visualizer(
    'Trippy',
    (p5: P5, analyzer: Tone.Analyser) => {
      const width = window.innerWidth;
      const height = window.innerHeight / 2;

      const topColor = p5.color(88,147,223);
      const bottomColor = p5.color(0,0,0);

      for (let y = 0; y < height; y++) {        //creates gradiant
        const lineColor = p5.lerpColor(topColor, bottomColor, y / height);

        p5.stroke(lineColor);
        p5.line(0,y,width,y);
      }

      const values = analyzer.getValue();

      p5.beginShape();
      
      p5.angleMode(p5.DEGREES)
      p5.rectMode(p5.CENTER)
      
      p5.noFill()
      p5.stroke(255)

      p5.translate(width /2, height / 2)

      for (let i = 0; i < 200; i++) {
        const amplitude = values[i] as number;
        
        p5.push()

        p5.rotate(p5.sin(p5.frameCount + i) * 300 * amplitude)

        let r = p5.map(p5.sin(p5.frameCount), -1, 1, 50, 255)
        let g = p5.map(p5.cos(p5.frameCount / 2), -1, 1, 50, 255)
        let b = p5.map(p5.sin(p5.frameCount / 4), -1, 1, 50, 255)

        p5.stroke(r, g, b)
        p5.rect(0, 0, 600 - i * 3, 600 - i * 3, 200 - i)
        p5.pop()
      }
      
      p5.endShape();      
    },
  );
  
  
