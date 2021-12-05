// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import { Automatic16 } from '@carbon/icons-react';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Ocarina.
 ** ------------------------------------------------------------------------ */

interface OcarinaKeyProps {
  note: string; // Cb, C, Db, D, Eb, E, Fb, F, G, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the ocarina hole
}

export function OcarinaKey({
  note,
  synth,
  minor,
  index,
}: OcarinaKeyProps): JSX.Element {
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
      onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {
        'bg-black black h3': minor,
        'black bg-white h4': !minor,
      })}    
      style={{
        display:"inline-block",
        backgroundColor: 'gray',
        borderRadius: "50%",
        width: 30,
        height: 30,
        top: -190 + (index > 5.5 ? 100 : 0),
        left: -60 + (index * 70) - (index > 5.5 ? 140 : 0),
      }}
    ></div>
  );
}

function OcarinaType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}

// I don't know how a real ocarina works ...
// Reference: http://www.vgmr.net/2013/04/basic-ocarina-notes.html

function Ocarina({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'Cb', idx: 0 },
    { note: 'C', idx: 0.5 },
    { note: 'Db', idx: 1.0 },
    { note: 'D', idx: 1.5 },
    { note: 'Eb', idx: 2 },
    { note: 'E', idx: 2.5 },
    { note: 'Fb', idx: 3 },
    { note: 'F', idx: 3.5 },
    { note: 'G', idx: 4 },
    { note: 'A', idx: 4.5 },
    { note: 'Bb' , idx: 5 },
    { note: 'B', idx: 5.5 },
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: 'sine' } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    'sine'
  ]) as List<OscillatorType>;

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4"
        style={{
          // CSS
          top: 0,
          left: 100,
          display:"inline-block",
          backgroundColor: 'lightblue',
          borderRadius: "50%",
          width: 400,
          height: 250,
        }}
      ></div>
      
      <div className="relative dib h4 w-100 ml4">
        {Range(5, 6).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <OcarinaKey
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave}
                index={(octave - 2) + key.idx}
              />
            );
          }),
        )}
      </div>
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <OcarinaType
            key={o}
            title={"Ocarina"}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
    </div>
  );
}

export const WilliamYu5Instrument = new Instrument('Ocarina', Ocarina);
