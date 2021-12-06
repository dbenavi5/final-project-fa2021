// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface XylophoneKeyProps {
  note: string; //Xylophone C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  mono?: Tone.MonoSynth; // Contains library code for making sound
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
        'bg-purple w6 shadow-6 h18': tunekey1, 
        'bg-blue w6 shadow-6 h17': tunekey2, 
        'bg-light-blue w6 shadow-6 h16': tunekey3, 
        'bg-dark-green w6 shadow-6 h15': tunekey4, 
        'bg-light-green w6 shadow-6 h14': tunekey5, 
        'bg-yellow w6 shadow-6 h13': tunekey6, 
        'bg-orange w6 shadow-6 h12': tunekey7, 
        'bg-red w6 shadow-6 h11': tunekey8,
        
      })}
      style={{
        // CSS
        left: `${index * 8}rem`,
        marginLeft:'2rem',
        // width: '6rem',
        borderRadius: '30px',
        border: 'none',
        
      }}
    ></div>
 
  );
}

interface XylophoneBarProps {
  bar1: boolean;
  bar2: boolean;
  octave: number;
  index: number;
}

export function XylophoneBar({
  bar1,
  bar2,
  index,
}: XylophoneBarProps): JSX.Element {
  return (
    <div
      className={classNames('ba pointer absolute', {
        'shadow-6 h1 mt-3 z--1': bar1,
        'shadow-6 h1 mt10 z--1 transform--3-deg': bar2,
        
      })}
      style={{
        // CSS
        left: `${index * 8}rem`,
        marginLeft:'2rem',
        borderRadius: '30px',
        border: 'none',
        backgroundColor: '#502900',
        padding: '1.5rem 1.5rem 0 70rem',
        
      }}
    ></div>
 
  );
}

function Xylophone({ mono}: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0.5, name: '1'},
    { note: 'D', idx: 1.5, name: '2' }, 
    { note: 'E', idx: 2.5, name: '3'},
    { note: 'F', idx: 3.5, name: '4'},
    { note: 'G', idx: 4.5, name: '5'},
    { note: 'A', idx: 5.5, name: '6'},
    { note: 'B', idx: 6.5, name: '7'},
    { note: 'Bb', idx: 7.5, name: '8'},
  ]);
  const bars = List([
    { idx: 0, name: '1'},
    { idx: 0, name: '2'},
  ]);

  
  return (
    <div className="pv4">
      <div>
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
      <div>
        {Range(2, 3).map(octave =>
          bars.map(key => {
            // const note = `${key.note}`;
            const bar1 = key.name.indexOf('1') !== -1;
            const bar2 = key.name.indexOf('2') !== -1;
            return (
              <XylophoneBar
                key={key.name} //react key
                bar1={bar1}
                bar2={bar2}
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