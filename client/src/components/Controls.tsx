import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'

/**
 *  Inspired by Ryan Finni
 *  https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */

function Controls({ isPlaying, onPlayPauseClick, onPrevClick, onNextClick }: any) {

    return (
        <div className='flex justify-between w-75 ma-01'>
            <button className='h3 w3 pointer no-border no-bg white' type='button' aria-label="Previous" onClick={onPrevClick}>
                <FontAwesomeIcon icon={faBackward} />
            </button>

            {isPlaying ? (
                <button
                    type="button"
                    className='h3 w3 pointer no-border no-bg white'
                    onClick={() => onPlayPauseClick(false)}
                    aria-label="Pause"
                >
                    <FontAwesomeIcon icon={faPause} />
                </button>
            ) : (
                <button
                    type="button"
                    className='h3 w3 pointer no-border no-bg white' 
                    onClick={() => onPlayPauseClick(true)}
                    aria-label="Play"
                >
                    <FontAwesomeIcon icon={faPlay} />
                </button>
            )}
            <button className='h3 w3 pointer no-border no-bg white' type='button' aria-label="Next" onClick={onNextClick}>
                <FontAwesomeIcon icon={faForward} />
            </button>
        </div>
    )
}

export default Controls;