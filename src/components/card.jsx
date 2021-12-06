import React from 'react';
import styled from 'styled-components';

const CardOuterWrapper = styled('div')`
    border-radius: 25px;
    padding: 0 15px 15px 15px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    :hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
`;

const CardInnerWrapper = styled('div')`
    width: 100%;
    text-align: ${props => props.centered ? 'center' : 'unset'}
`;

const CardTitle = styled('div')`
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 600;
`;

const CardFooter = styled('div')`
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 600;
`;

const Card = ({ title, children, footer, centered }) => {
    return (
        <CardOuterWrapper id={`card_${title}`}>
            <CardTitle>{title}</CardTitle>
            <CardInnerWrapper centered={centered}>
                {children}
            </CardInnerWrapper>
            {footer && <CardFooter>{footer}</CardFooter>}
        </CardOuterWrapper>
    );
};

Card.defaultProps = {
    centered: false
};

export default Card;
