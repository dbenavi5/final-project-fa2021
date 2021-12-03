import beat1 from "./assets/DeepEndFousheéDeepEndSingle.mp3";
import beat2 from "./assets/MyCherieAmour.mp3";
import beat3 from "./assets/Goosebumps.mp3";
import beat4 from "./assets/BenMichaelJackson.mp3";
import beat5 from './assets/ItsAllRightSamCook.mp3';

/**
 *  Inspired by Ryan Finni
 *  https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 * 
 *  Some of these artists are at https://pixabay.com/music/search/mood/laid%20back/
 */

const songs = [
    {
        title: "Deep End",
        artist: "Fousheé",
        album: 'Deep End - Single',
        audioSrc: beat1,
    },
    {
        title: "My Cherie Amour",
        artist: "Stevie Wonder",
        album: "My Cherie Amour",
        audioSrc: beat2,
    },
    {
        title: "Goosebumps",
        artist: "HVME (Remix)",
        album: "Goosebumps - Single",
        audioSrc: beat3,
    },
    {
        title: "Ben",
        artist: "Michael Jackson",
        album: 'Ben',
        audioSrc: beat4,
    },
    {
        title: "It's All Right",
        artist: "Sam Cook",
        album: "The Man Who Invented Soul",
        audioSrc: beat5,
    },
];

export default songs;