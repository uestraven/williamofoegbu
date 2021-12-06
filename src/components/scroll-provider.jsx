import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ScrollContainer = styled('div')`
  background: ${props => props.bgColor};
  transition: all 1s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;

  @keyframes collapse {
    from {
      height: 254px;
    }
    to {
      height: 40px;
    }
  }
  
  @keyframes open {
    from {
      height: 40px;
    }
    to {
      height: 254px;
    }
  }
`;

const ScrollProvider = ({ bgColor, onScroll }) => {
  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

    return <ScrollContainer bgColor={bgColor} />;
};

export default ScrollProvider;
