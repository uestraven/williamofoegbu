import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import Card from '../components/card';
import AudioPlayer from '../components/audio-player';
import AudioController from '../components/audio-controller';
import { soundClips_heatwave } from '../../public/sounds';
import ReactGA from 'react-ga';

import dynamic from 'next/dynamic';
const VideoPlayer = dynamic(import('../components/video-player.jsx'), { ssr: false });

const ContentContainer = styled('div')`
    width: 69%;
    z-index: 3;
    @media only screen and (max-width: 1165px) {
        width: 100%;
    }
`;

// import React from 'react';
// import styled from 'styled-components';
// import ReactGA from 'react-ga';

// const SVGWrapper = styled('svg')`
//     height: 15px;
//     cursor: pointer;
// `;

const SVGWrapper = styled('svg')`
    height: 15px;
    cursor: pointer;
`;

const DownloadLink = styled('a')`
    font-size: 16px;
    :hover {
        color: #ff54a5;
    }
`;

const DownloadButton = ({ path, text }) => {
    const handleDownload = e => {
        e.stopPropagation();
        ReactGA.event({
            category: 'Download',
            action: `${path} downloaded`
        });
    };
    return (
        <DownloadLink href={path} download onClick={handleDownload}>
            {text && text}
            {' '}
            <SVGWrapper xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" className="" />
            </SVGWrapper>
        </DownloadLink>
    );
};

// export default DownloadButton;


const ImageContainer = styled('div')`
    @media only screen and (min-width: 1165px) {
        display: ${props => props.animation ? 'flex' : 'none'};
        justify-content: center;
        align-items: center;
        img {
            animation-name: ${props => props.animation ? 'demos-slide' : 'none'};
            animation-duration: 1.5s;
            animation-direction: normal;
        }
        @keyframes demos-slide {
            0% {
                margin-left: -1000px;
                transform: rotate(0);
            }
            100% {
                margin-left: 0;
                transform: rotate(360deg);
            }
        }
    }
    @media only screen and (max-width: 1165px) {
        width: 100%;
        display: flex;
    }
`;

// const CharacterImage = styled('img')`
//     max-height: 300px;
//     cursor: pointer;
//     justify-content: center;
// `;

const CharacterImage = styled('img')`
    max-height: 300px;
    cursor: pointer;
    justify-content: center;
`;

// const ImageContainer = styled('div')`
//     width: 31%;
//     position: relative;
//     @media only screen and (max-width: 1165px) {
//         width: 100%;
//     }
// `;

// const CharacterImage = styled('img')`
//     max-height: 300px;
//     height: auto;
//     position: absolute;
// `;

// const WordImage = styled('img')`
//     max-height: 200px;
//     position: absolute;
//     left: 50px;
//     top: 225px;
//     @media only screen and (max-width: 1165px) {
//         max-height: 150px;
//     }
// `;

const FlexWrapper = styled('div')`
    display: flex;
    height: 100%;
    gap: 15px;
    @media only screen and (max-width: 1165px) {
        flex-direction: column;
        align-items: center;
    }
`;

const DemoSection = styled('div')`
    max-width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    @media only screen and (max-width: 1165px) {
        min-width: 250px;
        max-width: 400px;
        width: 100%;
    }
`;

const VideoSection = styled('div')`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    background-color: #e6e6e6;
    min-height: 425px;
    @media only screen and (max-width: 1165px) {
        height: 250px;
        width: 100%;
        min-width: 250px;
        max-width: 400px;
    }
`;

const DownloadButtonSection = styled('div')`
    height: 25px;
    width: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
`;

const DemosSection = ({ inView }) => {
    const { play, isPlaying } = AudioPlayer(soundClips_heatwave, true);
    const handleClickCharacter = () => {
        if (!isPlaying) play();
        ReactGA.event({
            category: 'Character Click',
            action: 'Clicked Heatwave'
        });
    };
    return (
        <Layout id="demos">
            <ImageContainer animation={inView}>
                <CharacterImage
                    className="animate"
                    src="/images/heatwave.png"
                    onClick={handleClickCharacter}
                />
            </ImageContainer>
            <ContentContainer>
                <Card title="DEMOS">
                    <FlexWrapper>
                        <DemoSection>
                            <AudioController
                                title="CHARACTER"
                                audio="/sounds/demos/Demo_Character_William_Ofoegbu_2021D.mp3"
                                show={false}
                                animate
                            />
                            <AudioController
                                title="COMMERCIAL"
                                audio="/sounds/demos/Demo_Commercial_William_Ofoegbu.mp3"
                                show={false}
                                animate
                            />
                            <AudioController
                                title="INDUSTRIAL & NARRATION"
                                audio="/sounds/demos/Demo_Industrial_Narration_William_Ofoegbu_2021A.mp3"
                                show={false}
                                animate
                            />
                            <AudioController
                                title="STUDIO SOUND"
                                audio="/sounds/demos/Studio_Sound.mp3"
                                show={false}
                                animate
                            />
                        </DemoSection>
                        <VideoSection>
                            <VideoPlayer
                                source="https://www.youtube.com/embed/9r5YZO-lm6I"
                                title="Studio Sound - William Ofoegbu"
                            />
                            <DownloadButtonSection>
                                <DownloadButton
                                    text="Download Audio"
                                    path="/sounds/demos/Studio_Sound.mp3"
                                />
                            </DownloadButtonSection>
                        </VideoSection>
                    </FlexWrapper>
                </Card>
            </ContentContainer>
        </Layout>
    );
};

DemosSection.defaultProps = {
    inView: false
};

export default DemosSection;
