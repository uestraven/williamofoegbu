import React from 'react';
import styled from 'styled-components';

const ResponsiveIframe = styled('iframe')`
    height: 100%;
    width: 100%;
`;

const VideoPlayer = ({ source, title }) => (
    <ResponsiveIframe
        height="400"
        width="400"
        src={source}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
    />
);

export default VideoPlayer;
