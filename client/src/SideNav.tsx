// 3rd party library imports
import classNames from 'classnames';
import { List } from 'immutable';
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  RadioButton20,
  RadioButtonChecked20,
  Music20,
} from '@carbon/icons-react';

// project imports
import { DispatchAction } from './Reducer';
import { AppState } from './State';
import { Instrument } from './Instrument2';
import { Visualizer } from './Visualizers';
import { Input } from '@material-ui/core';
import logo from './img/logo.png';
import MusicPlayer from './components/MusicPlayer';
import tracks from "./components/tracks";

/** ------------------------------------------------------------------------ **
 * All the components in the side navigation.
 ** ------------------------------------------------------------------------ */

interface SideNavProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
}

const Section: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="flex flex-column h-25 bb b--white pa3 white">
      <div className="f3 fw7 mb2 space-green">{title}</div>
      <div className="flex-auto overflow-y-auto">{children}</div>
    </div>
  );
};

interface RadioButtonProps {
  to: any,
  text: string,
  active: boolean,
  onClick: () => void
}

function RadioButton({ to, text, active, onClick }: RadioButtonProps): JSX.Element {
  return (
    <Link to={to} className="no-underline">
      <div
        className={classNames('f6 flex items-center white', { fw7: active })}
        onClick={onClick}
      >
        {active ? (
          <RadioButtonChecked20 className="mr1" />
        ) : (
          <RadioButton20 className="mr1" />
        )}
        <div className="dim f4">{text}</div>
      </div>
    </Link>
  );
}

function Instruments({ state }: SideNavProps): JSX.Element {
  const instruments: List<Instrument> = state.get('instruments');
  const activeInstrument = state.get('instrument')?.name;
  const location = useLocation();

  return (
    <Section title="Instruments">
      {instruments.map(i => (
        <RadioButton
          key={i.name}
          to={`/${i.name}${location.search}`}
          text={i.name}
          active={i.name === activeInstrument}
          onClick={() => console.log(i.name)}
        />
      ))}
    </Section>
  );
}

function Visualizers({ state }: SideNavProps): JSX.Element {
  const visualizers: List<Visualizer> = state.get('visualizers');
  const activeVisualizer = state.get('visualizer')?.name;
  const location = useLocation();

  return (
    <Section title="Visualizers">
      {visualizers.map(v => (
        <RadioButton
          key={v.name}
          to={{
            pathname: location.pathname,
            search: `?visualizer=${v.name}`,
          }}
          text={v.name}
          active={v.name === activeVisualizer}
          onClick={() => console.log(v.name)}
        />
      ))}
    </Section>
  );
}

function Songs({ state, dispatch }: SideNavProps): JSX.Element {
  const songs: List<any> = state.get('songs', List());
  const [searchSong, setSearchSong] = useState('');

  const handleChange = (event: any) => {
    setSearchSong(event.target.value)
  }

  const results = !searchSong
    ? songs
    : songs.filter((song) =>
      song.toString().toLowerCase().includes(searchSong.toString().toLowerCase()));

  return (
    <Section title="Playlist">
      <Input
        type="text"
        className='bg-white w-100 pa3'
        placeholder='Search...'
        value={searchSong}
        onChange={handleChange}
      />
      {results.map((song) => (
        <div
          key={song.get('id')}
          className="f4 pointer underline flex items-center no-underline i dim white"
          onClick={() =>
            dispatch(new DispatchAction('PLAY_SONG', { id: song.get('id') }))
          }
        >
          <Music20 className="mr1" />
          {song.get('songTitle')}
        </div>
      ))}
    </Section>
  );
}

export function SideNav({ state, dispatch }: SideNavProps): JSX.Element {
  return (
    <div
      className="absolute top-0 left-0 bottom-0 w18 z-max bg-black flex flex-column">
      <div
        className="h4 fw7 f3 flex items-center pl3 bb b--white white">
        <img
          src={logo}
          alt="VN Logo"
          className='z-max h3 w3'
          width='3rem'
          height='3rem'
        />
        &nbsp;&nbsp;VisualNoise
      </div>
      <div className="flex-auto">
        <Instruments state={state} dispatch={dispatch} />
        <Visualizers state={state} dispatch={dispatch} />
        <Songs state={state} dispatch={dispatch} />
        <MusicPlayer tracks={tracks} />
      </div>
    </div>
  );
}
