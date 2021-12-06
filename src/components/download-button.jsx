import React from 'react';
import styled from 'styled-components';

const DownloadLink = styled('a')`
    font-weight: 500;
    color: #fb53a3;
    :active {
        color: #5bcaff;
    }
`;

const DownloadButton = ({ path, text }) => {
    return (
        <DownloadLink
            download
            href={path}
        >
            {text}
        </DownloadLink>
    );
};

DownloadButton.defaultProps = {
    text: 'Download'
};

export default DownloadButton;
