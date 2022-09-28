import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import Card from '../components/card';
import AudioPlayer from '../components/audio-player';
import { soundClips_william } from '../../public/sounds';
import ReactGA from 'react-ga';

import dynamic from 'next/dynamic';
const EmailForm = dynamic(import('../components/email-form.jsx'), { ssr: false });

const ContentContainer = styled('div')`
    width: 80%;
    z-index: 3;
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
            animation-name: ${props => props.animation ? 'contact-slide' : 'none'};
            animation-duration: 1.5s;
            animation-direction: normal;
        }
        @keyframes contact-slide {
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

const ContactSection = ({ inView }) => {
    const { play, isPlaying } = AudioPlayer(soundClips_william, true);
    const handleClickCharacter = () => {
        if (!isPlaying) play();
        ReactGA.event({
            category: 'Character Click',
            action: 'Clicked Koku Ganaha'
        });
    };
    return (
        <Layout id="contact">
            <ContentContainer>
                <Card title="CONTACT">
                    <EmailForm />
                </Card>
            </ContentContainer>
            <ImageContainer animation={inView}>
                <CharacterImage
                    id="animate-contact"
                    src="/images/commissionwilliamo2.png"
                    onClick={handleClickCharacter}
                />
            </ImageContainer>
        </Layout>
    );
};

ContactSection.defaultProps = {
    inView: false
};

export default ContactSection;
