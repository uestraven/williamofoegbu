import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import Card from '../components/card';

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

const CharacterImage = styled('img')`
    max-height: 300px;
`;

const ContactSection = ({ inView }) => (
    <Layout id="contact">
        <ImageContainer animation={inView}>
            <CharacterImage src="/images/commissionwilliamo2.png" />
        </ImageContainer>
        <ContentContainer>
            <Card title="CONTACT">
                <EmailForm />
            </Card>
        </ContentContainer>
    </Layout>
);

ContactSection.defaultProps = {
    inView: false
};

export default ContactSection;
