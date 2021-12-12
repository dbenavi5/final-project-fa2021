// 3rd party library imports
import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

// project imports
import { DispatchAction } from './Reducer';
import { AppState } from './State';

/** ------------------------------------------------------------------------ **
 * Contains implementation of an Instruments.
 ** ------------------------------------------------------------------------ */

export interface InstrumentProps {
  synth: Tone.Synth;
  membrane: Tone.MembraneSynth;  // <- gives kick sound
  noise: Tone.NoiseSynth;         // <- gives snare sound
  metal: Tone.MetalSynth;         // <- gives hi-hat sound
  state: AppState;
  pluck: Tone.PluckSynth;
  mono: Tone.MonoSynth;
  dispatch: React.Dispatch<DispatchAction>;
  setSynth: (f: (oldSynth: Tone.Synth) => Tone.Synth) => void;
  setMembrane: (f: (oldMembraneSynth: Tone.MembraneSynth) => Tone.MembraneSynth) => void;
  setNoise: (f: (oldNoiseSynth: Tone.NoiseSynth) => Tone.NoiseSynth) => void;
  setMetal: (f: (oldMetalSynth: Tone.MetalSynth) => Tone.MetalSynth) => void;
  setPluck: (f: (oldPluckSynth: Tone.PluckSynth) => Tone.PluckSynth) => void;
  setMono: (f: (oldMonoSynth: Tone.MonoSynth) => Tone.MonoSynth) => void;

}

export class Instrument {
  public readonly name: string;
  public readonly component: React.FC<InstrumentProps>;

  constructor(name: string, component: React.FC<InstrumentProps>) {
    this.name = name;
    this.component = component;
  }
}

function TopNav({ name }: { name: string }) {
  return (
    <div
      className={
        'w-100 h4 bb bg-black b--white flex justify-between items-center ph4'
      }
    >
      <div className={'fw7 f3 pl4'}>{name}</div>
    </div>
  );
}

interface InstrumentContainerProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
  instrument: Instrument;
}

export const InstrumentContainer: React.FC<InstrumentContainerProps> = ({
  instrument,
  state,
  dispatch,
}: InstrumentContainerProps) => {
  const InstrumentComponent = instrument.component;



  const [synth, setSynth] = useState(
    new Tone.Synth({
      envelope: {
        attack: 0.05,
        attackCurve: "exponential",
        decay: 0.2,
        decayCurve: "exponential",
        release: 1.5,
        releaseCurve: "exponential",
        sustain: 0.2
      },
      oscillator: { type: 'sine' } as Tone.OmniOscillatorOptions,
    }).toDestination(),
  );

  const [mono, setMono] = useState(
    new Tone.MonoSynth({
      envelope: {
        attack: 0.05,
        attackCurve: "linear",
        decay: 0.3,
        // decayCurve: "exponential",
        release: .8,
        // releaseCurve: "exponential",
        sustain: 0.4,
      },
      filter: {
        detune: 0,
        frequency: 0,
        gain: 0,
        // rolloff: -12,
        type: "lowpass"
      },
      filterEnvelope: {
        attack: 0.001,
        attackCurve: "linear",
        decay: 0.7,
        // decayCurve: "exponential",
        release: 0.8,
        // releaseCurve: "exponential",
        sustain: 0.1,
        baseFrequency: 300,
        exponent: 2,
        octaves: 4,
      },
      oscillator: {

        type: "square",

      },

    }).toDestination(),

  );

  const [membrane, setMembrane] = useState(
    new Tone.MembraneSynth({
      pitchDecay: 0.02,
      octaves: 4,
      oscillator: { type: 'sine' } as Tone.OmniOscillatorOptions,
    }).toDestination(),
  );

  const [metal, setMetal] = useState(
    new Tone.MetalSynth({
      envelope: {
        attack: 0.001,
        decay: 1.4,
        release: 0.2
      },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5
    }).toDestination(),
  );

  const [noise, setNoise] = useState(
    new Tone.NoiseSynth({
      noise: { type: 'white' },    // sound changes from here
      envelope: {
        attack: 0.001,
        decay: 0.2,
        sustain: 0
      }
    }).toDestination(),
  );

  const [pluck, setPluck] = useState(
    new Tone.PluckSynth({
      attackNoise: 20,
      dampening: 7000,
      resonance: 0.7,
    }).toDestination(),
  );
  
  const notes = state.get('notes');

  // useEffect for playlist song
  useEffect(() => {
    if (notes && synth) {
      let eachNote = notes.split(' ');
      let noteObjs = eachNote.map((note: string, idx: number) => ({
        idx,
        time: `+${idx / 4}`,
        note,
        velocity: 1,
      }));
      new Tone.Part((time, value) => {
        // the value is an object which contains both the note and the velocity
        synth.triggerAttackRelease(value.note, '4n', time, value.velocity);

        // I think this condition allows the user replay the song.
        if (value.idx === eachNote.length - 1) {
          dispatch(new DispatchAction('STOP_SONG'));
        }
      }, noteObjs).start();

      Tone.Transport.start();

      return () => {
        Tone.Transport.cancel();
      };
    }

    return () => { };
  }, [notes, synth, dispatch]);

  return (
    <div>
      <TopNav name={instrument.name} />
      <div
        className={'left-2 absolute right-0'}
      >
        <InstrumentComponent
          state={state}
          dispatch={dispatch}
          synth={synth}
          membrane={membrane}
          noise={noise}
          metal={metal}
          setSynth={setSynth}
          setMembrane={setMembrane}
          setNoise={setNoise}
          setMetal={setMetal}
          pluck={pluck}
          setPluck={setPluck}
          mono={mono}
          setMono={setMono}
        />
      </div>
    </div>
  );
};
