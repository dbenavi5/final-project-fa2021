// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { DrumInstrument } from './instruments/dbenavi5_instrument';
import { WaveformVisualizer } from './visualizers/Waveform';
import { CircleWaveformVisualizer } from './visualizers/dbenavi5_visualizer';

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

const instruments = List([PianoInstrument, DrumInstrument]);
const visualizers = List([WaveformVisualizer, CircleWaveformVisualizer]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
