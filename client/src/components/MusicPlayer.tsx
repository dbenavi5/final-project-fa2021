import { useState, useEffect, useRef } from "react";
import Controls from "./Controls";

/**
 *  Inspired by Ryan Finni
 *  https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */

const MusicPlayer = ({ tracks }: any) => {
    // State
    const [trackIndex, setTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Destructure for conciseness
    const { title, artist, audioSrc } = tracks[trackIndex];

    // Refs
    const audioRef = useRef(new Audio(audioSrc));
    const intervalRef = useRef();
    const isReady = useRef(false);

    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);
        }
    };

    const toNextTrack = () => {
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        }
    };

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // Handles cleanup and setup when changing tracks
    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(audioSrc);
        audioRef.current.volume = 0.2

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true;
        }
    }, [audioSrc, trackIndex]);

    useEffect(() => {
        let interval: any = intervalRef.current;
        // Pause and clean up on unmount
        return () => {
            audioRef.current.pause();
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="ml2 white">
            <div>
                <h2 className='tc f3 fw7 mb2 space-green'>Playing Now</h2>
                <h2 className='f4 i tc'>Song: {title}</h2>
                <h3 className='tc f4 i'>By: {artist}</h3>
                <Controls
                    isPlaying={isPlaying}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={setIsPlaying}
                />
            </div>
        </div>
    );
};

export default MusicPlayer;
