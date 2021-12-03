// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { WilliamYu5Instrument } from './instruments/WilliamYu5';
import { WaveformVisualizer } from './visualizers/Waveform';
import { WilliamYu5Visualizer } from './visualizers/WilliamYu5';

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

const instruments = List([PianoInstrument, WilliamYu5Instrument]);
const visualizers = List([WaveformVisualizer, WilliamYu5Visualizer]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
