import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import Card from '../components/card';
import AudioPlayer from '../components/audio-player';
import { soundClips_kokuGanaha } from '../../public/sounds';
import ReactGA from 'react-ga';

const ContentContainer = styled('div')`
    width: 62%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    @media only screen and (max-width: 1165px) {
        width: 100%;
    }
`;

const ImageContainer = styled('div')`
    @media only screen and (min-width: 1165px) {
        display: ${props => props.animation ? 'flex' : 'none'};
        align-items: center;
        justify-content: center;
        img {
            animation-name: ${props => props.animation ? 'about-me-slide' : 'none'};
            animation-duration: 1.5s;
            animation-direction: normal;
        }
        @keyframes about-me-slide {
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

// const CharacterImage = styled('img')`
//     max-height: 300px;
//     height: auto;
//     position: absolute;
// `;

// const WordImage = styled('img')`
//     max-height: 200px;
//     position: absolute;
//     left: 100px;
//     top: 225px;
//     @media only screen and (max-width: 1165px) {
//         max-height: 150px;
//     }
// `;

const Paragraph = styled('p')`
    margin-top: 0;
`;

const AboutMeSection = ({ inView }) => {
    const { play, isPlaying } = AudioPlayer(soundClips_kokuGanaha, true);
    const handleClickCharacter = () => {
        if (!isPlaying) play();
        ReactGA.event({
            category: 'Character Click',
            action: 'Clicked Koku Ganaha'
        });
    };
    return (
        <Layout id="about-me" reverse>
            <ContentContainer>
                <Card title="ABOUT ME">
                    <Paragraph>Hi :)</Paragraph>
                    <Paragraph>I love bringing characters to life. Over the years, I’ve sharpened and polished my wide array of voices not only to breathe new life into loving, scary, cheerful, and/or intense characters that you and your audiences will love to hear but also to bring reliability, encouragement, guidance, and even honor that anyone could admire along with your products, services, and identity!</Paragraph>
                    <Paragraph>Over the decades, I’ve done my best and more on stage, on-camera, behind the mic, and behind the scenes to give audiences, viewers, and listeners the best performances possible (Pepsi, Microsoft, Dimensional Ink Games, Good Shepherd Entertainment, and more)! I now explicitly focus on the world of voice over. I’ve had great coaches to help me ensure that I deliver the best vocal performances (Chris Sabat, Sean Schemmel, Debi Derriberry, and more), and I continue to work and practice regularly in my home studio to keep my skills razor sharp!</Paragraph>
                    <Paragraph>My name is William Ofoegbu. I’m based in Texas, and I am a voice actor that you can depend on!</Paragraph>
                    <Paragraph>Thanks for checking out my page! Have a great day!</Paragraph>
                </Card>
                <Card title="STUDIO" centered>
                    Information available upon request.
                </Card>
            </ContentContainer>
            <ImageContainer animation={inView}>
                <CharacterImage
                    id="animate-about-me"
                    src="/images/kokuganaha.png"
                    onClick={handleClickCharacter}
                />
            </ImageContainer>
        </Layout>
    );
};

export default AboutMeSection;
