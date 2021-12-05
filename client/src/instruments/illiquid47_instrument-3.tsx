// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import { Branch24 } from '@carbon/icons-react';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface XylophoneKeyProps {
  note: string; //Xylophone C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  mono?: Tone.MonoSynth; // Contains library code for making sound
  minor?: boolean;
  tunekey1: boolean; 
  tunekey2: boolean; 
  tunekey3: boolean; 
  tunekey4: boolean; 
  tunekey5: boolean; 
  tunekey6: boolean; 
  tunekey7: boolean; 
  tunekey8: boolean; 
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function XylophoneKey({
  note,
  mono,
  minor,
  duration,
  tunekey1,
  tunekey2,
  tunekey3,
  tunekey4,
  tunekey5,
  tunekey6,
  tunekey7,
  tunekey8,
  index,
}: XylophoneKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseDown={() => mono?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => mono?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {
        'bg-purple purple shadow-6 h18': tunekey1, 
        'bg-blue blue shadow-6 h17': tunekey2, 
        'bg-light-blue light-blue shadow-6 h16': tunekey3, 
        'bg-dark-green darkgreen shadow-6 h15': tunekey4, 
        'bg-light-green light-green shadow-6 h14': tunekey5, 
        'bg-yellow yellow shadow-6 h13': tunekey6, 
        'bg-orange orange shadow-6 h12': tunekey7, 
        'bg-red red shadow-6 h11': tunekey8, 
        
      })}
      style={{
        // CSS
        top: 0,
        left: `${index * 8}rem`,
        width: '6rem',
        borderRadius: '30px',
        border: 'none',
        
      }}
    ></div>
 
  );
}

function Xylophone({ mono}: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0, name: '1'},
    { note: 'D', idx: 1, name: '2' }, 
    { note: 'E', idx: 2, name: '3'},
    { note: 'F', idx: 3, name: '4'},
    { note: 'G', idx: 4, name: '5'},
    { note: 'A', idx: 5, name: '6'},
    { note: 'B', idx: 6, name: '7'},
    { note: 'Bb', idx: 7, name: '8'},
  ]);

  
  return (
    <div className="pv4">
      <div className="relative dib h8 w-100 ml4">
        <div className='w-100 bg-brown z-0' style={{margin: '2rem'}}>wood</div> 
        <div className='w-100 bg-brown z-0' style={{margin: '3rem'}}>wood</div>
        {Range(2, 3).map(octave =>
          keys.map(key => {
            const isTunekey1 = key.name.indexOf('1') !== -1;
            const isTunekey2 = key.name.indexOf('2') !== -1;
            const isTunekey3 = key.name.indexOf('3') !== -1;
            const isTunekey4 = key.name.indexOf('4') !== -1;
            const isTunekey5 = key.name.indexOf('5') !== -1;
            const isTunekey6 = key.name.indexOf('6') !== -1;
            const isTunekey7 = key.name.indexOf('7') !== -1;
            const isTunekey8 = key.name.indexOf('8') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <XylophoneKey
                key={note} //react key
                note={note}
                mono={mono}
                tunekey1={isTunekey1}
                tunekey2={isTunekey2}
                tunekey3={isTunekey3}
                tunekey4={isTunekey4}
                tunekey5={isTunekey5}
                tunekey6={isTunekey6}
                tunekey7={isTunekey7}
                tunekey8={isTunekey8}
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

export const XylophoneInstrument = new Instrument('Xylophone', Xylophone);
