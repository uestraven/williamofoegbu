import { useState } from 'react';
import useSound from 'use-sound';

const AudioPlayer = (audio, randomize) => {
    const isMulti = Array.isArray(audio);

    const getRandomClip = () => {
        const randomIndex = Math.floor(Math.random() * audio.length);
        return audio[randomIndex];
    };

    const [clipIndex, setClipIndex] = useState(0);

    const getClipToPlay = () => {
        if (isMulti) {
            return randomize ? getRandomClip() : audio[clipIndex];
        }
        return audio;
    };

    const [clipToPlay, setClipToPlay] = useState(getClipToPlay());
    const [isPlaying, setIsPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);

    const [play, { stop, sound, duration }] = useSound(clipToPlay, {
        onend: () => {
            setIsPlaying(false);
            if (isMulti) {
                if (randomize) {
                    setClipToPlay(getRandomClip());
                } else {
                    const newClipIndex = clipIndex === audio.length - 1 ? 0 : clipIndex + 1;
                    setClipIndex(newClipIndex);
                    setClipToPlay(audio[newClipIndex]);
                }
            }
          },
          playbackRate
    });
    const playAudio = () => {
        play();
        setIsPlaying(true);
    };

    const pauseAudio = () => {
        sound.pause();
        setIsPlaying(false);
    }

    const stopAudio = () => {
        stop();
        setIsPlaying(false);
    };

    const muteAudio = () => {
        const shouldMute = !muted;
        setMuted(shouldMute);
        sound.mute(shouldMute);
    };

    const forwardAudio = () => {
        setPlaybackRate(playbackRate === 1 ? 2 : 1);
    };

    const backAudio = () => {
        sound.seek(0);
    };

    const nextAudio = () => {
        if (isMulti && clipIndex < audio.length - 1) {
            setClipIndex(clipIndex + 1);
            setClipToPlay(audio[newClipIndex]);
            play();
        }
    };

    const seekAudio = (sec) => {
        if (sec && sound) sound.seek(sec);
    };

    const positionAudio = () => sound && sound.seek() ? sound.seek() : 0;

    return {
        play: playAudio,
        duration,
        pause: pauseAudio,
        stop: stopAudio,
        isPlaying,
        mute: muteAudio,
        forward: forwardAudio,
        back: backAudio,
        next: nextAudio,
        seek: seekAudio,
        position: positionAudio
    };
};

AudioPlayer.defaultProps = {
    randomize: false,
};

export default AudioPlayer;