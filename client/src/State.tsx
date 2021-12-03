// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { WilliamYu5Instrument } from './instruments/WilliamYu5';
import { WilliamYu5Visualizer } from './visualizers/WilliamYu5';
import { DrumInstrument } from './instruments/dbenavi5_instrument_2';
import { WaveformVisualizer } from './visualizers/Waveform';
import { CircleWaveformVisualizer } from './visualizers/dbenavi5_visualizer_2';
import { RaymondVisualizers } from './visualizers/raymond-git_visualizer_1';
import { GuitarInstrument } from './instruments/raymond-git_instrument_1';
import { trippyVisualizer } from './visualizers/illiquid47_visualizer-3';
import { XylophoneInstrument } from './instruments/illiquid47_instrument-3';

/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */

/**
 * Observation: pure map (compare and contrast with impure map)
 *
 * 'instrument': Instrument
 * 'visualizer': Visualizer
 */
export type AppState = Map<string, any>;

const instruments = List([PianoInstrument, DrumInstrument, GuitarInstrument, XylophoneInstrument, WilliamYu5Instrument]);
const visualizers = List([WaveformVisualizer, CircleWaveformVisualizer, RaymondVisualizers, trippyVisualizer, WilliamYu5Visualizer]);

export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
