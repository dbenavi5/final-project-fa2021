// 3rd party library imports
import * as Tone from 'tone';
import styles from './dbenavi5_instrument.module.css'
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
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;  // time
  membrane?: Tone.MembraneSynth; // kick, bass sound
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

interface DrumMetalSoundProps {
  name: string    // instrument name
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;  // time
  metal?: Tone.MetalSynth; // hi-hat, cymbal
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

interface DrumNoiseSoundProps {
  name: string    // instrument name
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;  // time
  noise?: Tone.NoiseSynth; // snare sound
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function DrumMembraneSound({
  name,
  note,
  membrane,
  index,
}: DrumMembraneSoundProps): JSX.Element {
  return (
    <div
      onMouseDown={() => membrane?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?  <- handling an event
      onMouseUp={() => membrane?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?  <- duration of each note
      className={styles.membrane}
      style={{ top: 0, left: `${index * 2}rem` }}
    >{`${name}`}</div>
  );
}

export function DrumMetalSound({
  name,    // instrument name
  note,
  metal,
  index,
}: DrumMetalSoundProps): JSX.Element {
  return (
    <div
      onMouseDown={() => metal?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?  <- handling an event
      onMouseUp={() => metal?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?  <- duration of each note
      className={styles.metal}
      style={{ top: 180, left: `${index * 2}rem` }}
    >{`${name}`}</div>
  );
}

export function DrumNoiseSound({
  // note,
  name,
  noise,
  index,
}: DrumNoiseSoundProps): JSX.Element {
  return (
    <div
      onMouseDown={() => noise?.triggerAttack()} // Question: what is `onMouseDown`?  <- handling an event
      onMouseUp={() => noise?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?  <- duration of each note
      className={styles.noise}
      style={{ top: 360, left: `${index * 2}rem` }}
    >{`${name}`}</div>
  );
}

function Drum({ membrane, metal, noise }: InstrumentProps): JSX.Element {
  const membraneKeys = List([
    //A,B,C,D,E,F,G  ==> minor: Ab,Bb,Cb,Db,Eb,Fb,Gb
    { memNote: 'C', idx: 0, name: 'Kick' },
    { memNote: 'F', idx: 8, name: 'Tom' },
    { memNote: 'G', idx: 16, name: 'Bass' }
  ]);
  const metalKeys = List([
    { metalNote: 'C', idx: 0, name: 'Hi-Hat' },
    { metalNote: 'F', idx: 8, name: 'Open-Hat' },
    { metalNote: 'B', idx: 16, name: 'Closed-Hat' }
  ]);
  const noiseType = List([
    { noiseType: '8n', idx: 0, name: 'Snare' }
  ])

  // const setNoiseType = (newType: Tone.NoiseType) => {
  //   setNoise(oldNoise => {
  //     oldNoise.disconnect();

  //     return new Tone.NoiseSynth({
  //       noise: { type: newType } as Tone.NoiseOptions
  //     }).toDestination();
  //   })
  // }

  return (
    <div className="pv4">
      <div className="sticky">
        {Range(2, 3).map(octave =>
          membraneKeys.map(key => {
            const note = `${key.memNote}${octave}`;
            const name = `${key.name}`;
            return (
              <DrumMembraneSound
                key={note} //react key
                name={name}
                note={note}
                membrane={membrane}
                octave={octave}
                index={(octave - 2) + key.idx}
              />
            );
          }),
        )}
      </div>
      <div className="sticky">
        {Range(2, 3).map(octave =>
          metalKeys.map(key => {
            const metalNote = `${key.metalNote}${octave}`;
            const name = `${key.name}`;
            return (
              <DrumMetalSound
                name={name}
                key={metalNote} //react key
                note={metalNote}
                metal={metal}
                octave={octave}
                index={(octave - 2) + key.idx}
              />
            );
          }),
        )}
      </div>
      <div className="sticky">
        {Range(2, 3).map(octave =>
          noiseType.map(key => {
            const noiseNote = `${key.noiseType}`;
            const name = `${key.name}`;
            return (
              <DrumNoiseSound
                key={noiseNote} //react key
                name={name}
                note={noiseNote}
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
