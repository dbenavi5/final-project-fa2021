// 3rd party library imports
import * as Tone from 'tone';
import { List, Range } from 'immutable';
import classNames from 'classnames';
// project imports
import { Instrument, InstrumentProps } from '../Instruments';

interface CopyGuitarSoundProp {
    note: string;
    duration?: string;
    octave: number;
    pluck?: Tone.PluckSynth;
    index: number;
}

interface GuitarStyleProps {
    board: boolean;
    index: number;
    // circles: boolean;
}

export function CopyGuitarSound({
    note,
    pluck,
    index,
}: CopyGuitarSoundProp): JSX.Element {

    return (
        <div
            onMouseDown={() => pluck?.triggerAttack(`${note}`, "+0.55")}
            className={'pointer dim bg-black pl50 mt4 b4black top-0 z-2'}
            style={{ left: `${index * 2}rem` }}
        >
        </div>
    );
}

export function GuitarStyle({
    board,
    index,
    // circles,
}: GuitarStyleProps): JSX.Element {
    return (
        <div
            className={classNames('absolute', {
                'pl50 bg-white top-0-ns z--1 bg-dark-brown bg-img-linear-brown': board,
            })}
            style={{ left: `${index * 2}rem`, width: '55rem' }}
        >
        </div>
    )
}

function CopyGuitar({ pluck }: InstrumentProps): JSX.Element {
    const guitarKeys = List([
        { note: 'E2', idx: 0, name: 'C4' },
        { note: 'F2', idx: 4, name: 'C3' },
        { note: 'D2', idx: 8, name: 'C2' },
        { note: 'G2', idx: 12, name: 'C1' },
        { note: 'B2', idx: 16, name: 'C1' },
        { note: 'C2', idx: 20, name: 'C1' },
    ]);

    const boardAndCircles = List([
        { idx: 0, name: 'Board' }
    ]);

    return (
        <div className="pv4 ">
            <div className="sticky dib h4 ml4">
                {Range(2, 3).map(octave =>
                    guitarKeys.map(key => {
                        const guitarNote = `${key.note}`;
                        return (
                            <CopyGuitarSound
                                key={guitarNote} //react key
                                note={guitarNote}
                                pluck={pluck}
                                octave={octave}
                                index={(octave - 2) + key.idx}
                            />
                        );
                    }),
                )}
            </div>
            <div className="sticky">
                {Range(2, 3).map(octave =>
                    boardAndCircles.map(index => {
                        const isBoard = index.name.indexOf('Board') !== -1;
                        return (
                            <GuitarStyle
                                key={index.idx}
                                board={isBoard}
                                index={(octave - 2) + index.idx}
                            />
                        )
                    }))
                }
            </div>
        </div>
    );
}

export const CopyGuitarInstrument = new Instrument('Copy-Guitar', CopyGuitar);