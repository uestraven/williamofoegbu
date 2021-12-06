import React, { useState, useEffect } from 'react';
import AudioPlayer from './audio-player';
import styled from 'styled-components';
import ReactGA from 'react-ga';

const AudioControllerWrapper = styled('div')`
    display: flex;
    flex-direction: column;
    gap: 7px;
    border: 2px solid gray;
    border-radius: 3px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    padding: 5px;
    font-weight: 600;
    font-size: 14px;
    background: none;
    cursor: pointer;
    :hover {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }
    .openaudio {
        cursor: default;
    }
    @keyframes  random {
        15% { background-color: #5bcaff; }
        30% { background-color: #52feb5; }
        45% { background-color: #008040; }
        60% { background-color: #a349a4; }
        75% { background-color: #c8bfe7; }
        90% { background-color: #ffffff; }
    }
    @media only screen and (max-width: 1165px) {
        min-height: 44px;
        justify-content: center;
    }
`;

const TitleRow = styled('button')`
    text-align: center;
    font-weight: 700;
    font-size: 14px;
    background: none;
    border: none;
    cursor: pointer;
    @media only screen and (max-width: 1165px) {
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 30px;
    }
`;

const ControlRow = styled('div')`
    display: none;
    justify-content: space-around;
    align-items: center;
    padding: 3px 0;
    border: 1px solid gray;
    border-radius: 3px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    :hover {
        box-shadow: 0 3px 5px 0 rgba(0,0,0,0.2);
    }
    &.openaudio {
        display: flex;
    }
    @media only screen and (max-width: 1165px) {
        min-height: 30px;
    }
`;

const SeekerRow = styled('div')`
    display: none;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &.openaudio {
        display: flex;
    }
`;

const Seeker = styled('input')`
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    :hover {
        opacity: 1;
    }
    ::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 15px;
        height: 15px;
        background: #ff54a5;
        cursor: pointer;
    }
    ::-moz-range-thumb {
        width: 15px;
        height: 15px;
        background: #ff54a5;
        cursor: pointer;
    }
    @media only screen and (max-width: 1165px) {
        height: 30px;
        ::-webkit-slider-thumb {
            height: 30px;
            width: 30px;
        }
        ::-moz-range-thumb {
            height: 30px;
            width: 30px;
        }
    }
`;

const ElapsedTimerRow = styled('div')`
    display: flex;
    justify-content: space-between;
    width: 99%;
`;

const SVGWrapper = styled('svg')`
    height: 15px;
    cursor: pointer;
`;

const LargeSVGWrapper = styled('svg')`
    height: 25px;
    cursor: pointer;
    margin-left: 10px;
`;

const PlayButton = ({ play }) => {
    return (
        <LargeSVGWrapper onClick={play} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="button svg-inline--fa fa-play fa-w-14 fa-lg">
            <path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" className="" />
        </LargeSVGWrapper>
    );
};

const PauseButton = ({ pause }) => {
    return (
        <LargeSVGWrapper onClick={pause} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="button svg-inline--fa fa-pause fa-w-14 fa-lg">
            <path fill="currentColor" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z" className="" />
        </LargeSVGWrapper>
    );
};

const BackButton = ({ back }) => {
    return (
        <SVGWrapper onClick={back} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="step-backward" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="button svg-inline--fa fa-step-backward fa-w-14 fa-fw fa-lg">
            <path fill="currentColor" d="M64 468V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v176.4l195.5-181C352.1 22.3 384 36.6 384 64v384c0 27.4-31.9 41.7-52.5 24.6L136 292.7V468c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12z" className="" />
        </SVGWrapper>
    );
};

const MuteButton = ({ muted, mute }) => {
    return muted ? (
        <SVGWrapper style={{ width: '15px' }} onClick={mute} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-mute" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="button svg-inline--fa fa-volume-mute fa-w-16 fa-fw fa-lg">
            <path fill="currentColor" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z" className="" />
        </SVGWrapper>
        ) : (
        <SVGWrapper style={{ width: '15px' }} onClick={mute} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="button svg-inline--fa fa-volume-up fa-w-18 fa-lg">
            <path fill="currentColor" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z" className="" />
        </SVGWrapper>
    );
};

// const DownloadLink = styled('a')`
//     font-size: 16px;
//     :hover {
//         color: #ff54a5;
//     }
// `;

// const DownloadButton = ({ path, text }) => {
//     const handleDownload = e => {
//         e.stopPropagation();
//         ReactGA.event({
//             category: 'Download',
//             action: `${path} downloaded`
//         });
//     };
//     return (
//         <DownloadLink href={path} download onClick={handleDownload}>
//             {text && text}
//             {' '}
//             <SVGWrapper aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="button svg-inline--fa fa-download fa-w-16 fa-fw fa-lg">
//                 <path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" className="" />
//             </SVGWrapper>
//         </DownloadLink>
//     );
// };

const ElapsedTimer = ({ sec, dur }) => {
    const convertSecsToTime = (num) => {
        const mins = num / 60;
        const finalMins = Math.floor(mins).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: false,
        });
        const secs = mins % 1 * 60;
        const finalSecs = secs.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: false,
        });
        return `${finalMins}.${finalSecs}`;
    };
    const seconds = convertSecsToTime(sec / 1000);
    const duration = convertSecsToTime(dur / 1000);
    return (
        <ElapsedTimerRow>
            <div>{seconds ? seconds : '00.00'}</div>
            <div>{duration ? duration : '00.00'}</div>
        </ElapsedTimerRow>
    );
};

const AudioController = ({ audio, title, show, animate }) => {
    const {
        play,
        pause,
        mute,
        stop,
        back,
        duration,
        seek,
        isPlaying,
        position
    } = AudioPlayer(audio);
    const [val, setVal] = useState(0)
    const [muted, setMuted] = useState(false);
    const [showController, setShowController] = useState(show);

    useEffect(() => {
        const updatePosition = () => {
            setVal(position() * 1000);
            if (isPlaying) {
                window.requestAnimationFrame(updatePosition);
            }
        };
        requestAnimationFrame(updatePosition);
    }, [isPlaying]);

    const handleSeek = (target) => {
        seek(target / 1000);
        setVal(target);
    };

    const handleBack = () => {
        back();
        setVal(0);
    };

    const handleMute = () => {
        setMuted(!muted);
        mute();
    };

    const handlePlay = () => {
        play();
        ReactGA.event({
            category: 'Demo Click',
            action: `Clicked ${title} demo`
        });
    };

    return (
        <AudioControllerWrapper
            className={showController ? 'openaudio' : null}
            style={isPlaying && animate ? { animation: 'random 2.5s infinite' } : null}
        >
            <TitleRow
                onClick={(e) => {
                    e.stopPropagation();
                    if (!isPlaying) {
                        setShowController(!showController);
                        stop();
                    }
                }}
            >
                {title}
            </TitleRow>
            <ControlRow className={showController ? 'openaudio' : null}>
                <BackButton back={handleBack} />
                {
                    isPlaying ? <PauseButton pause={pause} /> : <PlayButton play={handlePlay} />
                }
                <MuteButton mute={handleMute} muted={muted} />
            </ControlRow>
            <SeekerRow className={showController ? 'openaudio' : null}>
            <Seeker
                type="range"
                value={val}
                min="0"
                max={duration}
                value={val}
                style={{ width: '100%' }}
                onChange={(e) => handleSeek(e.target.value)}
            />
            <ElapsedTimer
                sec={val}
                dur={duration}
            />
            </SeekerRow>
        </AudioControllerWrapper>
    );
};

AudioController.defaultProps = {
    show: true,
    animate: false,
};

export default AudioController;