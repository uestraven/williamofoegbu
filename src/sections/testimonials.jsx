import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import Card from '../components/card';

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
    width: 75%;
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
        quote: 'You guys take notes. This is an actor!',
        name: 'Sonny Strait, Sonny Strait Studios'
    },
    {
        quote: 'Props to you for it! You did great work, everyone is thrilled.',
        name: 'Alex Keller, Dimensional Ink Games',
    },
    {
        quote: 'Thanks, William! You did a fantastic job.',
        name: 'Matt Forbeck, Good Shepherd Entertainment',
    },
    {
        quote: 'I really appreciate your help. This is excellent!',
        name: 'Goodluck Ofoegbu, GNO Modeling Research',
    },
    {
        quote: 'Heatwave is awesome. My second-favorite Rogue. You did a most excellent job portraying him. I definitely feel the aster when I fight him.',
        name: 'Steven Taiclet, DC Universe Online fan',
    },
    {
        quote: 'Oh my gosh… It is SO GOOD!!! You are just perfect in this too! You are super talented! Thank you! My husband was cracking up big time!',
        name: 'Dana Freitag, Voice Over Artist',
    },
    {
        quote: 'You got nothing but praise with these sets. My colleagues were very impressed with the energy and the intensity you put into this - we had never gotten anything quite like that before! Our writer also pointed out that the characters sound exactly like what he imagined when writing the scripts, and that he doubted we were going to get anything that matched his vision this well.',
        name: 'Arthur, Age of the Ring Team'
    }
];

const TestimonialsSection = () => {
    const [index, setIndex] = useState(0);
    const getNext = (shouldIncrement) => {
        if (shouldIncrement) {
            setIndex(index + 1 >= testimonials.length ? 0 : index + 1);
        } else {
            setIndex(index - 1 < 0 ? testimonials.length - 1 : index - 1);
        }
    };
    return (
        <Layout id="testimonials">
            <Card title="TESTIMONIALS"
                footer={
                    <div>
                        {
                            testimonials.map(({ quote, name }, i) => (
                                <SelectorButton
                                    key={`${quote}_${name}`}
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
                        <Quote>
                            {testimonials[index].quote}
                        </Quote>
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
