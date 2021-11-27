// 3rd party library imports
import * as Tone from 'tone';
// import styles from './style/dbenavi5_instrument.module.css'
import { List, Range } from 'immutable';
import classNames from 'classnames'

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


interface DrumMetalSoundProps {
  name: string    // instrument name
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;  // time
  metal?: Tone.MetalSynth; // hi-hat, cymbal
  hiHatCymbal: boolean;
  crashCymbal: boolean;
  rideCymbal: boolean;
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

interface DrumMembraneSoundProps {
  name: string    // instrument name
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;  // time
  membrane?: Tone.MembraneSynth; // kick, bass sound
  lowTomDrum: boolean;
  midTomDrum: boolean;
  hiTomDrum: boolean;
  bassDrum: boolean;
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

interface DrumNoiseSoundProps {
  name: string    // instrument name
  // note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;  // time
  noise?: Tone.NoiseSynth; // snare sound
  snareDrum: boolean;
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function DrumMetalSound({
  name,    // instrument name
  note,
  metal,
  duration,
  hiHatCymbal,
  crashCymbal,
  rideCymbal,
  index,
}: DrumMetalSoundProps): JSX.Element {
  return (
    <div
      onMouseDown={() => metal?.triggerAttackRelease(`${note}`, `${duration}`)}
      className={classNames('ba pointer absolute dim', {
        'absolute bg-black blue w4 h4 tc br-100-ns': hiHatCymbal,
        'absolute bg-black red h6 w6 tc br-100-ns': crashCymbal,
        'absolute bg-black red h9 w9 tc br-100-ns': rideCymbal,
      })}
      style={{
        top: 0,
        left: `${index * 2}rem`,
        border: '10px solid #aaa9ad',
        margin: '2rem',
        marginLeft: '5rem',
      }}
    >{`${name}`}</div>
  );
}

export function DrumMembraneSound({
  name,
  note,
  membrane,
  lowTomDrum,
  midTomDrum,
  hiTomDrum,
  bassDrum,
  index,
}: DrumMembraneSoundProps): JSX.Element {
  return (
    <div
      onMouseDown={() => membrane?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?  <- handling an event
      onMouseUp={() => membrane?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?  <- duration of each note
      className={classNames('ba pointer absolute dim', {
        'bg-black blue h6 w6 tc br-100-ns': hiTomDrum,
        'bg-black red h7 w6-ns tc br5': bassDrum,
        'bg-black white w4 h4 tc br-100-ns bottom-1-ns': midTomDrum,
        'bg-black white h6 w6 tc br-100-ns': lowTomDrum,
      })}
      style={{
        top: 200,
        left: `${index * 2}rem`,
        border: '10px solid #aaa9ad',
        margin: '2rem',
        marginLeft: '5rem',
      }}
    > {`${name}`}</div >
  );
}

export function DrumNoiseSound({
  name,
  noise,
  snareDrum,
  index,
}: DrumNoiseSoundProps): JSX.Element {
  return (
    <div
      onMouseDown={() => noise?.triggerAttack()}
      onMouseUp={() => noise?.triggerRelease('+0.25')}
      className={classNames('ba pointer absolute dim', {
        'absolute bg-black red h6 w6 tc br-100-ns': snareDrum,
      })}
      style={{
        top: 440,
        left: `${index * 2}rem`,
        border: '10px solid #aaa9ad',
        margin: '2rem',
        marginLeft: '5rem',
      }}
    >{`${name}`}</div>
  );
}

function Drum({ membrane, metal, noise }: InstrumentProps): JSX.Element {

  const metalKeys = List([
    { metalNote: 'A', duration: '32n', idx: 0, name: 'Hi-Hat' },
    { metalNote: 'B', duration:'4n', idx: 8, name: 'Crash Cymbal' },
    { metalNote: 'G', duration: '2n', idx: 16, name: 'Ride Cymbal' },
  ]);

  const membraneKeys = List([
    //A,B,C,D,E,F,G  ==> minor: Ab,Bb,Cb,Db,Eb,Fb,Gb
    { memNote: 'D', idx: 0, name: 'Hi-Tom' },
    { memNote: 'G', idx: 8, name: 'Bass' },
    { memNote: 'F', idx: 14, name: 'Mid-Tom' },
    { memNote: 'A', idx: 20, name: 'Low-Tom' },
  ]);

  const noiseType = List([
    { idx: 0, name: 'Snare' },
  ])

  return (
    <div>
      <div className="sticky">
        {Range(2, 3).map(octave =>
          metalKeys.map(key => {
            const metalNote = `${key.metalNote}${octave}`;
            const isHiHatDrum = key.metalNote.indexOf('A') !== -1;
            const isCrashDrum = key.metalNote.indexOf('B') !== -1;
            const isRideDrum = key.metalNote.indexOf('G') !== -1;
            const name = `${key.name}`;
            const duration = `${key.duration}`
            return (
              <DrumMetalSound
                name={name}
                key={metalNote} //react key
                note={metalNote}
                metal={metal}
                duration={duration}
                hiHatCymbal={isHiHatDrum}
                crashCymbal={isCrashDrum}
                rideCymbal={isRideDrum}
                octave={octave}
                index={(octave - 2) + key.idx}
              />
            );
          }),
        )}
      </div>
      <div className="sticky">
        {Range(2, 3).map(octave =>
          membraneKeys.map(key => {
            const note = `${key.memNote}${octave}`;
            const isHiTomDrum = key.memNote.indexOf('D') !== -1;
            const isBassDrum = key.memNote.indexOf('G') !== -1;
            const isMidTomDrum = key.memNote.indexOf('F') !== -1;
            const isLowTomDrum = key.memNote.indexOf('A') !== -1;
            const name = `${key.name}`;
            // const num  = key.noteNum
            return (
              <DrumMembraneSound
                key={note} //react key
                name={name}
                note={note}
                hiTomDrum={isHiTomDrum}
                midTomDrum={isMidTomDrum}
                lowTomDrum={isLowTomDrum}
                bassDrum={isBassDrum}
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
          noiseType.map(key => {
            const name = `${key.name}`;
            const isSnareDrum = key.name.indexOf('Snare') !== -1;
            return (
              <DrumNoiseSound
                key={name} //react key
                name={name}
                noise={noise}
                snareDrum={isSnareDrum}
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
