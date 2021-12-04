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
  state: AppState;
  synth: Tone.Synth;
  membrane: Tone.MembraneSynth;  // <- gives kick sound
  noise: Tone.NoiseSynth;         // <- gives snare sound
  metal: Tone.MetalSynth;         // <- gives hi-hat sound
  pluck: Tone.PluckSynth;
  setPluck: (f: (oldPluckSynth: Tone.PluckSynth) => Tone.PluckSynth) => void;
  setSynth: (f: (oldSynth: Tone.Synth) => Tone.Synth) => void;
  setMembrane: (f: (oldMembraneSynth: Tone.MembraneSynth) => Tone.MembraneSynth) => void;
  setNoise: (f: (oldNoiseSynth: Tone.NoiseSynth) => Tone.NoiseSynth) => void;
  setMetal: (f: (oldMetalSynth: Tone.MetalSynth) => Tone.MetalSynth) => void;
  dispatch: React.Dispatch<DispatchAction>;
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
      oscillator: { type: 'sine' } as Tone.OmniOscillatorOptions,
    }).toDestination(),
  );
  const [membrane, setMembrane] = useState(
    new Tone.MembraneSynth({
      pitchDecay: 0.02,
      octaves: 3,
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
      attackNoise: 0,
      dampening: 4000,
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
      }, noteObjs).start(0);

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
        />
      </div>
    </div>
  );
};
