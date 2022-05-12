import React, { useState } from 'react';
import styled from 'styled-components';

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

const Carousel = ({ data }) => {
    console.log('hello');
    console.log(data[0].img);
    const [index, setIndex] = useState(0);
    const getNext = (shouldIncrement) => {
        if (shouldIncrement) {
            setIndex(index + 1 >= data.length ? 0 : index + 1);
        } else {
            setIndex(index - 1 < 0 ? data.length - 1 : index - 1);
        }
    };
    return (
        <CarouselWrapper>
            <LeftArrow onClick={() => getNext(false)} />
            <ContentWrapper>
                <TextWrapper>
                    <img src="/images/logos/elevenarts.png" />
                    {/* <Quote>
                        {data[index].quote}
                    </Quote> */}
                    <Name>
                        {data[index].name}
                    </Name>
                </TextWrapper>
                <div>
                {
                    data.map(({ quote, name }, i) => (
                        <SelectorButton
                            key={`${quote}_${name}`}
                            onClick={() => setIndex(i)}
                            className={i === index ? 'active': null}
                        />)
                    )
                }
                </div>
            </ContentWrapper>
            <RightButton onClick={() => getNext(true)} />
        </CarouselWrapper>
    );
};

export default Carousel;