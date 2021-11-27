// 3rd party library imports
import * as Tone from 'tone';
import styles from './style/dbenavi5_instrument.module.css'
import { List, Range } from 'immutable';

// project imports
import { Instrument, InstrumentProps } from '../Instrument2';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Drum Set.
 * 
 * sounds: High-tom, mid-tom, low-tom, cymbal, clash, bass-drum
 * completed: kick, hi-hat, snare drum
 * === sound libraries ===
 * membrane: tom, kick, bass 
 * noise: snare,
 * metal: hi-hat, cymbal, clash
 ** ------------------------------------------------------------------------ */

interface DrumMembraneSoundProps {
  name: string    // instrument name
  membraneNote: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  metalNote: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  // noiseNote: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  // noteNum: number
  duration?: string;  // time
  membrane?: Tone.MembraneSynth; // kick, bass sound
  metal?: Tone.MetalSynth; // kick, bass sound
  noise?: Tone.NoiseSynth; // kick, bass sound
  octave: number;
  index: number; // octave + index together give a location for the piano key
}


export function DrumMembraneSound({
  name,
  membraneNote,
  metalNote,
  // noiseNote,
  membrane,
  metal,
  noise,
  index,
}: DrumMembraneSoundProps): JSX.Element {
  return (
    <>
      <div
        onMouseDown={() => membrane?.triggerAttack(`${membraneNote}`)} // Question: what is `onMouseDown`?  <- handling an event
        onMouseUp={() => membrane?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?  <- duration of each note
        className={styles.membrane}
        style={{ top: 0, left: `${index * 2}rem` }}
      >{`${name}`}</div>
      <div
        onMouseDown={() => metal?.triggerAttack(`${metalNote}`)} // Question: what is `onMouseDown`?  <- handling an event
        onMouseUp={() => membrane?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?  <- duration of each note
        className={styles.membrane}
        style={{ top: 200, left: `${index * 2}rem` }}
      >{`${name}`}</div>
      <div
        onMouseDown={() => noise?.triggerAttack()} // Question: what is `onMouseDown`?  <- handling an event
        onMouseUp={() => membrane?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?  <- duration of each note
        className={styles.membrane}
        style={{ top: 400, left: `${index * 2}rem` }}
      >{`${name}`}</div>
    </>
  );
}

function Drum({ membrane, metal, noise }: InstrumentProps): JSX.Element {
  const membraneKeys = List([
    //A,B,C,D,E,F,G  ==> minor: Ab,Bb,Cb,Db,Eb,Fb,Gb
    { memNote: 'D', idx: 0, name: 'Kick' },
    { metal: 'G', idx: 8, name: 'Cymbal' },
    { idx: 16, name: 'Snare' }
  ]);

  return (
    <div>
      <div className="sticky">
        {Range(2, 3).map(octave =>
          membraneKeys.map(key => {
            const memNote = `${key.memNote}${octave}`;
            const metalNote = `${key.metal}${octave}`;
            // const noiseNote = `${key.noise}${octave}`;
            const name = `${key.name}`;
            // const num  = key.noteNum
            return (
              <DrumMembraneSound
                key={name} //react key
                name={name}
                membraneNote={memNote}
                metalNote={metalNote}
                // noiseNote={noiseNote}
                membrane={membrane}
                metal={metal}
                noise={noise}
                octave={octave}
                index={(octave - 2) + key.idx}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

export const DrumInstrument = new Instrument('Drum', Drum);

