// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { TestInstrument } from './instruments/WilliamYu5';
import { WaveformVisualizer } from './visualizers/Waveform';
import { KaleidoscopeVisualizer } from './visualizers/WilliamYu5';

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

const instruments = List([PianoInstrument, TestInstrument]);
const visualizers = List([WaveformVisualizer, KaleidoscopeVisualizer]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
