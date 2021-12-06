import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import Card from '../components/card';
import AudioPlayer from '../components/audio-player';
import { soundClips_plasticMan } from '../../public/sounds';
import { DownloadButton } from '../components/audio-controller';
import ReactGA from 'react-ga';

import dynamic from 'next/dynamic';
const PdfViewer = dynamic(import('../components/pdf-viewer.jsx'), { ssr: false });

const ContentContainer = styled('div')`
    width: 62%;
    @media only screen and (max-width: 1165px) {
        width: 100%;
    }
`;

const ImageContainer = styled('div')`
    @media only screen and (min-width: 1165px) {
        display: ${props => props.animation ? 'flex' : 'none'};
        justify-content: center;
        align-items: center;
        img {
            animation-name: ${props => props.animation ? 'resume-slide' : 'none'};
            animation-duration: 1.5s;
            animation-direction: normal;
        }
        @keyframes resume-slide {
            0% {
                margin-right: -1000px;
                transform: rotate(0);
            }
            100% {
                margin-right: 0;
                transform: rotate(360deg);
            }
        }
    }
    @media only screen and (max-width: 1165px) {
        width: 100%;
        display: flex;
    }
`;

const CharacterImage = styled('img')`
    max-height: 300px;
    cursor: pointer;
`;

const LinkContainer = styled('div')`
    display: flex;
    justify-content: center;
    text-decoration: none;
`;

const DownloadLink = styled('a')`
    color: #333;
    font-size: 18px;
    text-decoration: none;
    font-weight: 600;
    :hover {
        color: #a349a4;
    }
`;

const ResumeSection = ({ inView }) => {
    const { play, isPlaying } = AudioPlayer(soundClips_plasticMan, true);

    const handleClickCharacter = () => {
        if (!isPlaying) play();
        ReactGA.event({
            category: 'Character Click',
            action: 'Clicked Plastic Man'
        });
    };

    return (
        <Layout id="resume" reverse>
            <ContentContainer>
                <Card
                    title="R&Eacute;SUM&Eacute;"
                    
                >
                    <PdfViewer />
                    <LinkContainer>
                        <DownloadButton path="/docs/Resume2021B.pdf" text="Download" />
                    </LinkContainer>
                </Card>
            </ContentContainer>
            <ImageContainer animation={inView}>
                <CharacterImage
                    src="/images/plasticman.png"
                    onClick={handleClickCharacter}
                />
            </ImageContainer>
        </Layout>
    );
};

ResumeSection.defaultProps = {
    inView: false
};

export default ResumeSection;
