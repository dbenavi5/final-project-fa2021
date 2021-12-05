// 3rd party library imports
import * as Tone from 'tone';
import { List, Range } from 'immutable';
import classNames from 'classnames';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

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
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  metal?: Tone.MetalSynth; // hi-hat, cymbal
  hiHatCymbal: boolean;
  crashCymbal: boolean;
  rideCymbal: boolean;
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

interface DrumMembraneSoundProps {
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
  duration?: string;  // time
  noise?: Tone.NoiseSynth; // snare sound
  snareDrum: boolean;
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function DrumMetalSound({
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
      onMouseDown={() => metal?.triggerAttackRelease(`${note}`, `${duration}`, '+0.25', 1)}
      className={classNames('ba pointer absolute dim', {
        'absolute bg-black red w9 h9 tc br-100-ns top-15-ns z-1': hiHatCymbal,
        'absolute bg-black red h10 w10 tc br-100-ns top-5-ns z-3': crashCymbal,
        'absolute bg-black red h13 w13 tc br-100-ns top-11-ns z-3': rideCymbal,
      })}
      style={{
        left: `${index * 2}rem`,
        border: '3px solid #BF953F',
        margin: '2rem',
        marginLeft: '5rem',
        background: 'radial-gradient(circle, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
      }}
    ></div>
  );
}

export function DrumMembraneSound({
  note,
  duration,
  membrane,
  lowTomDrum,
  midTomDrum,
  hiTomDrum,
  bassDrum,
  index,
}: DrumMembraneSoundProps): JSX.Element {
  return (
    <div
      onMouseDown={() => membrane?.triggerAttackRelease(`${note}`, `${duration}`, '+0.25', 1)}
      className={classNames('pointer absolute dim', {
        'h8 w8 tc br-100-ns top-11-ns z-1 ba-5 bc': hiTomDrum,
        'h11 w6-ns tc br5 top-10-ns z-0 bt-5 bb-5 bc': bassDrum,
        'w9 h9 tc br-100-ns top-11-ns ba-5 bc': midTomDrum,
        'h11 w11 tc br-100-ns top-21-ns ba-5 bc': lowTomDrum,
      })}
      style={{
        left: `${index * 2}rem`,
        margin: '2rem',
        marginLeft: '5rem',
        backgroundColor: bassDrum ? '#600018' : '#fdf5e6',
      }}
    ></div >
  );
}

export function DrumNoiseSound({
  duration,
  noise,
  snareDrum,
  index,
}: DrumNoiseSoundProps): JSX.Element {
  return (
    <div
      onMouseDown={() => noise?.triggerAttackRelease(`${duration}`)}
      className={classNames('ba pointer absolute dim', {
        'bg-white h10 w10 tc br-100-ns top-20-ns': snareDrum,
      })}
      style={{
        left: `${index * 2}rem`,
        border: '10px solid #aaa9ad',
        margin: '2rem',
        marginLeft: '5rem',
      }}
    ></div>
  );
}

function Drum({ membrane, metal, noise }: InstrumentProps): JSX.Element {

  const metalKeys = List([
    { metalNote: 'D', duration: '32n', idx: 10, name: 'Hi-Hat' },
    { metalNote: 'B', duration: '4n', idx: 12, name: 'Crash Cymbal' },
    { metalNote: 'G', duration: '2n', idx: 24, name: 'Ride Cymbal' },
  ]);

  const membraneKeys = List([
    { memNote: 'A', duration: '16n', idx: 15, name: 'Hi-Tom' },
    { memNote: 'F', duration: '32n', idx: 16, name: 'Bass' },
    { memNote: 'G', duration: '8n', idx: 21, name: 'Mid-Tom' },
    { memNote: 'C', duration: '2n', idx: 23, name: 'Low-Tom' },
  ]);

  const noiseType = List([
    { duration: '8n', idx: 13, name: 'Snare' },
  ]);

  return (
    <div>
      <div className="sticky">
        {Range(2, 3).map(octave =>
          metalKeys.map(key => {
            const metalNote = `${key.metalNote}${octave}`;
            const isHiHatDrum = key.metalNote.indexOf('D') !== -1;
            const isCrashDrum = key.metalNote.indexOf('B') !== -1;
            const isRideDrum = key.metalNote.indexOf('G') !== -1;
            const duration = `${key.duration}`;
            return (
              <DrumMetalSound
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
            const isHiTomDrum = key.memNote.indexOf('A') !== -1;
            const isBassDrum = key.memNote.indexOf('F') !== -1;
            const isMidTomDrum = key.memNote.indexOf('G') !== -1;
            const isLowTomDrum = key.memNote.indexOf('C') !== -1;
            const duration = `${key.duration}`;
            return (
              <DrumMembraneSound
                key={note} //react key
                note={note}
                duration={duration}
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
            const isSnareDrum = key.name.indexOf('Snare') !== -1;
            const duration = `${key.duration}`;
            return (
              <DrumNoiseSound
                key={key.idx}
                noise={noise}
                duration={duration}
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