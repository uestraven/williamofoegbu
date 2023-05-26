import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import Card from '../components/card';
import AudioPlayer from '../components/audio-player';
import { soundClips_caranLambar } from '../../public/sounds';
import ReactGA from 'react-ga';

const LeftImageContainer = styled('div')`
    @media only screen and (min-width: 1165px) {
        display: ${props => props.animation ? 'flex' : 'none'};
        justify-content: center;
        align-items: center;
        img {
            animation-name: ${props => props.animation ? 'testimonial-slide-left' : 'none'};
            animation-duration: 1.5s;
            animation-direction: normal;
        }
        @keyframes testimonial-slide-left {
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
    cursor: pointer;
`;

const CarouselWrapper = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 200px;
    width: 750px;
    @media only screen and (max-width: 1165px) {
        width: auto;
        height: 350px;
    }
`;

const LeftArrow = styled('button')`
    width: 0; 
    height: 0; 
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: none;
    border-right: 20px solid #52feb5;
    background: none;
    cursor: pointer;
    padding-left: 0px;
`;

const ContentWrapper = styled('div')`
    /** width: 75%; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const TextWrapper = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 150px;
    text-align: center;
`;

const Quote = styled('q')`
    font-style: italic;
`;
const Name = styled('p')`
    font-weight: bold;
    color: rgba(0,0,0,0.2);
`;

const RightButton = styled('button')`
    width: 0; 
    height: 0; 
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #52feb5;
    border-right: none;
    background: none;
    cursor: pointer;
    padding-right: 0px;
`;

const SelectorButton = styled('button')`
    height: 15px;
    width: 15px;
    background-color: #555;
    margin: 5px;
    cursor: pointer;
    border: none;
    border-radius: 50%;
    &.active {
        background-color: #52feb5;
    }
`;

const testimonials = [
    {
        img: '/images/logos/crunchyroll.png',
        name: 'Crunchyroll',
    },
    {
        img: '/images/logos/elevenarts.png',
        name: 'Eleven Arts',
    },
    {
        img: '/images/logos/Soundcadence.png',
        name: 'Sound Cadence Studios',
    },
    {
        img: '/images/logos/Dimensionalink.jpg',
        name: 'Dimensional Ink Games',
    },
    {
        img: '/images/logos/goodshepherd.png',
        name: 'Good Shepherd Entertainment',
    },
    {
        img: '/images/logos/KingsIsle.webp',
        name: 'KingsIsle Entertainment',
    },
    {
        img: '/images/logos/Warnerbros.png',
        name: 'Warner Bros. Games',
    },
    {
        quote: 'You guys take notes. This is an actor!',
        name: 'Sonny Strait, Sonny Strait Studios'
    },
    {
        quote: 'I\'ve been an audio engineer/producer in VO for years and I can confidently say William is the real deal. He is a joy to work with and he delivers top notch content consistently, as well as he is very conscious of his vocal levels - if you are on the fence, give him a shot. He won\'t disappoint you.',
        name: 'Joe Miller, Little Orbit'
    }
];

const TestimonialsSection = ({ inView }) => {
    const [index, setIndex] = useState(0);
    const getNext = (shouldIncrement) => {
        if (shouldIncrement) {
            setIndex(index + 1 >= testimonials.length ? 0 : index + 1);
        } else {
            setIndex(index - 1 < 0 ? testimonials.length - 1 : index - 1);
        }
    };

    const { play, isPlaying } = AudioPlayer(soundClips_caranLambar, true);

    const handleClickCharacter = () => {
        if (!isPlaying) play();
        ReactGA.event({
            category: 'Character Click',
            action: 'Clicked Caran Lambar'
        });
    };

    return (
        <Layout id="testimonials">
            <LeftImageContainer animation={inView}>
                <CharacterImage
                    id="animate-testimonials-left"
                    src="/images/triographic.png"
                    onClick={handleClickCharacter}
                />
            </LeftImageContainer>
            <Card title="CLIENTS"
                footer={
                    <div>
                        {
                            testimonials.map(({ name }, i) => (
                                <SelectorButton
                                    key={name}
                                    onClick={() => setIndex(i)}
                                    className={i === index ? 'active': null}
                                />)
                            )
                        }
                    </div>
                }
            >
                <CarouselWrapper>
                <LeftArrow onClick={() => getNext(false)} />
                <ContentWrapper>
                    <TextWrapper>
                        {testimonials[index].img && (<img height="125" src={testimonials[index].img} />)}
                        {testimonials[index].quote && (<Quote>
                            {testimonials[index].quote}
                        </Quote>)}
                        <Name>
                            {testimonials[index].name}
                        </Name>
                    </TextWrapper>
                </ContentWrapper>
                <RightButton onClick={() => getNext(true)} />
                </CarouselWrapper>
            </Card>
        </Layout>
    );
};

export default TestimonialsSection;
