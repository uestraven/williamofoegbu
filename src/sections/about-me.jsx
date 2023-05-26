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
                    <Paragraph>William Ofoegbu is a Texas-based, African-American voice actor and foster dad who values happiness, peace, determination, doing his best, communication, education, his incredible and amazing daughter, and the yin-yangs of relaxation and thoroughness along with intensity and tranquility. He was born in Toronto, grew up in San Antonio, earned his Associate of Arts in Theatre from San Antonio College, and booked his first principal commercial role moments later. He went on to earn his Bachelor's of Science in Communication from Arizona State University and on-camera roles in Superbowl and NFL Playoff ads for Pepsi; commercials for Xbox, Microsoft, and Daily Greens; the television series “From Dusk Till Dawn: The Series;” and more!</Paragraph>
                    <Paragraph>Today, William's resounding voice and performances are heard in more and more anime, video games, commercials, and then some. He's known for his roles as Corpse God (Dead Mount Death Play), Twisted Keiun (Hell's Paradise), Sammy Jones (Sugar Apple Fairy Tale), Heat Wave and Plastic Man (DC Universe Online), and as the commercial voice for The Vista Portable Hammock and Stand.</Paragraph>
                    <Paragraph>Outside of the studio, William is known for cooking and enjoying delicious food, teaching, learning new things (currently practicing American Sign Language and playing harmonica), and watching new series and movies. Most of all, he loves anime, manga, creativity, and his friends and family. He especially loves his wonderful teenage daughter! Because he's the best dad on the planet according to her and the T-shirt they bought!</Paragraph>
                </Card>
                <Card title="HOME STUDIO" centered>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div><b>Interface:</b> Solid State Logic SSL2</div>
                        <div><b>Microphone:</b> BeesNeez BU87i </div>
                        <div><b>DAW:</b> Reaper</div>
                        <div><b>Internet:</b> Hardwired 300 Mbps Down & 20 Mbps Up</div>
                        <div>Source Connect, Zoom, Discord, Skype, Google, CleanFeed, WeTransfer</div>
                        <div>Acoustically treated space with Sonic Acoustics 3” pyramid foam</div>
                        <div>Additional 25” monitor for video and script</div>
                        <div style={{ marginTop: '15px' }}><b>Backup Equipment:</b> AT2020 Cardioid Condenser microphone & Scarlett Solo 3rd Gen</div>
                    </div>
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
