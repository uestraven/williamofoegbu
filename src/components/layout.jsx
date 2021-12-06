import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled('div')`
    width: 90vw;
    display: flex;
    justify-content: center;
`;

const FlexContainer = styled('div')`
    width: 100%;
    max-width: 1165px;
    display: flex;
    justify-content: center;
    gap: 15px;
    @media only screen and (max-width: 1165px) {
        flex-direction: ${props => props.reverse ? 'column-reverse' : 'column'}
    }
`;

const Layout = ({ children, id, reverse }) => (
    <PageWrapper id={id}>
        <FlexContainer reverse={reverse}>
            {children}
        </FlexContainer>
    </PageWrapper>
);

Layout.defaultProps = {
    reverse: false
};

export default Layout;