// 3rd party library imports
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Tone from 'tone';
import { Music32 } from '@carbon/icons-react';

// project imports
import { InstrumentContainer } from './Instruments';
import { AppState } from './State';
import { DispatchAction } from './Reducer';
import { SideNav } from './SideNav';
import { VisualizerContainer } from './Visualizers';

type PanelProps = {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
};

/** ------------------------------------------------------------------------ **
 * Instrument and visualizer component
 ** ------------------------------------------------------------------------ */

function InstrumentPanel({ state, dispatch }: PanelProps): JSX.Element {
  /**
   * This React component is the top-level for the instrument.
   */
  const instrument = state.get('instrument');

  return (
    <div>
      {instrument && (
        <InstrumentContainer
          state={state}
          dispatch={dispatch}
          instrument={instrument}
        />
      )}
    </div>
  );
}

function VisualizerPanel({ state }: PanelProps): JSX.Element {
  /**
   * This React component is the top-level for the visualizer.
   */
  const visualizer = state.get('visualizer');

  return (
    <div className='z-9999'>
      {visualizer && (
        <VisualizerContainer key={visualizer.name} visualizer={visualizer} />
      )}
    </div>
  );
}

function InstrumentAndVisualizer({ state, dispatch }: PanelProps): JSX.Element {
  /**
   * This React component bundles the instrument panel and visualizer panel together.
   */

  return (
    <div
      className="absolute left-16 right-0 bottom-0 top-0 flex flex-column white"
    >
      <InstrumentPanel state={state} dispatch={dispatch} />
      <VisualizerPanel state={state} dispatch={dispatch} />
    </div>
  );
}

function ShowWelcome(): JSX.Element {
  return (
    <div
      className="absolute right-0 left-0 bottom-0 top-0 flex flex-column items-center justify-center white"
    >
      <div className="mw6 lh-copy mb4 white">
        <Music32 />
        <div className="f3 fw7 mb2 white">Welcome to the case study.</div>
        <div className="f4 mb3 white">
          Select an instrument and a visualizer on the left to serve some fresh
          beats.
        </div>
        <div className="f5 white">The UI is yours to design. Express yourself.</div>
      </div>
    </div>
  );
}

/** ------------------------------------------------------------------------ **
 * Main page component
 ** ------------------------------------------------------------------------ */

export function MainPage({ state, dispatch }: PanelProps): JSX.Element {
  /**
   * This React component bundles together the entire main page.
   */

  const location = useLocation();
  const isWelcome = !state.get('instrument');
  console.log('INSTRUMENT', isWelcome);

  useEffect(() => {
    dispatch(new DispatchAction('SET_LOCATION', { location }));
  }, [dispatch, location]);

  return (
    <div
      className="fixed top-0 left-0 h-100 w-100 bg-lamp-black"
      onClick={() => Tone.start()}
    >
      <SideNav state={state} dispatch={dispatch} />
      {isWelcome ? (
        <ShowWelcome />
      ) : (
        <InstrumentAndVisualizer state={state} dispatch={dispatch} />
      )}
    </div>
  );
}
