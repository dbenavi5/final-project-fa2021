// 3rd party library imports
import * as Tone from 'tone';
import { List, Range } from 'immutable';
import './style/raymond-git_Instrument.css';
import classNames from 'classnames';
// project imports
import { Instrument, InstrumentProps } from '../Instruments2';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface GuitarSoundProp {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  pluck?: Tone.PluckSynth;
  Fm?: Tone.FMSynth;
  index: number | string; // octave + index together give a location for the piano key
  name: string;
}

export function GuitarSound({
  name,
  note,
  synth,
  minor,
  index,
  pluck,
  Fm,
}: GuitarSoundProp): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */

   const plucky = new Tone.PluckSynth({}).toDestination();
  // const fmSynth = new Tone.FMSynth().toDestination();


  return (
    <div
      onMouseDown={() => plucky?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => plucky?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className='guitar'
    >
      <div className='strings'>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note single-note'></div>
        <div className='note'></div>
        <div className='note single-note'></div>
        <div className='note'></div>
        <div className='note single-note'></div>
        <div className='note'></div>
        <div className='note single-note'></div>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note'>
          <div className='double-note'></div>
        </div>
      </div>
      <div className='strings'>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note single-note1'></div>
        <div className='note'></div>
        <div className='note single-note1'></div>
        <div className='note'></div>
        <div className='note single-note1'></div>
        <div className='note'></div>
        <div className='note single-note1'></div>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note'></div>
      </div>
      <div className='strings'>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note single-note2'></div>
        <div className='note'></div>
        <div className='note single-note2'></div>
        <div className='note'></div>
        <div className='note single-note2'></div>
        <div className='note'></div>
        <div className='note single-note2'></div>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note'></div>
      </div>
      <div className='strings'>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note single-note3'></div>
        <div className='note'></div>
        <div className='note single-note3'></div>
        <div className='note'></div>
        <div className='note single-note3'></div>
        <div className='note'></div>
        <div className='note single-note3'></div>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note'></div>
      </div>
      <div className='strings'>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note single-note4'></div>
        <div className='note'></div>
        <div className='note single-note4'></div>
        <div className='note'></div>
        <div className='note single-note4'></div>
        <div className='note'></div>
        <div className='note single-note4'></div>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note'></div>
      </div>
      <div className='strings'>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note single-note5'></div>
        <div className='note'></div>
        <div className='note single-note5'></div>
        <div className='note'></div>
        <div className='note single-note5'></div>
        <div className='note'></div>
        <div className='note single-note5'></div>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note'></div>
        <div className='note'></div>
      </div>
    </div>
  );
}

function Guitar({ pluck }: InstrumentProps): JSX.Element {
  const guitarKeys = List([
    { note: 'C5', idx: 0, name: 'C4' },
    { note: 'C4', idx: +1, name: 'C3' },
    { note: 'C3', idx: +1.5, name: 'C2' },
    { note: 'C2', idx: +2, name: 'C1' },
    { note: 'C1', idx: +2.5, name: 'C1' },
  ]);

  return (
    <div className="pv4 ">
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 7).map(octave =>
          guitarKeys.map(key => {
            const guitarNote = `${key.note}`;
            const name = `${key.name}`
            return (
              <GuitarSound //This is the piano instrument 
                name={name}
                key={guitarNote} //react key
                note={guitarNote}
                // Fm={Fm}
                pluck={pluck}
                octave={octave}
                index={(octave - 1) + key.idx}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

export const GuitarInstrument = new Instrument('Guitar', Guitar);