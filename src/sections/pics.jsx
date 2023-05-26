import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import Card from '../components/card';
import AudioPlayer from '../components/audio-player';
import { soundClips_toshirou } from '../../public/sounds';
import ReactGA from 'react-ga';

const ContentContainer = styled('div')`
    width: 69%;
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
            animation-name: ${props => props.animation ? 'pics-slide' : 'none'};
            animation-duration: 1.5s;
            animation-direction: normal;
        }
        @keyframes pics-slide {
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

const PhotoViewer = styled('div')`
    display: flex;
    gap: 15px;
    height: 100%;
    @media only screen and (max-width: 1165px) {
        flex-direction: column-reverse;
    }
`;

const ThumbnailSection = styled('div')`
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    border-right: none;
    display: inline;
    flex-wrap: wrap;
    gap: 10px;
    width: 185px;
    min-width: 185px;
    max-height: 450px;
    padding: 10px;
    overflow: scroll;
    ::-webkit-scrollbar {
        width: 7px;
    }
    ::-webkit-scrollbar-thumb {
        background: #008040; 
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #52feb5; 
     }
     @media only screen and (max-width: 1165px) {
         display: inline;
         width: 100%;
         max-height: 120px;
     }
`;

const PhotoSection = styled('div')`
    flex-grow: 2;
    box-shadow: inset 0 0 4px rgb(0 0 0 / 20%);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 450px;
`;

const Thumbnail = styled('img')`
    margin: 0 2px;
    width: 75px;
    height: 94px;
    cursor: pointer;
    :hover {
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    }
    @media only screen and (max-width: 1165px) {
        margin-right: 2px;
    }
`;

const Photo = styled('img')`
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 450px;
     @media only screen and (max-width: 1165px) {
         width: auto;
         height: auto;
         max-height: 450px;
     }
`;

const PicsSection = ({ inView }) => {
    const { play, isPlaying } = AudioPlayer(soundClips_toshirou, true);
    const [displayPhoto, setDisplayPhoto] = useState("/images/headshots/Headshot_One.jpg");
    const handleClickCharacter = () => {
        if (!isPlaying) play();
        ReactGA.event({
            category: 'Character Click',
            action: 'Clicked Toshirou'
        });
    };
    return (
        <Layout id="pics">
            <ImageContainer animation={inView}>
                <CharacterImage
                    src="/images/toshirou.png"
                    onClick={handleClickCharacter}
                />
            </ImageContainer>
            <ContentContainer>
                <Card title="PICS">
                    <PhotoViewer>
                        <ThumbnailSection>
                            <Thumbnail
                                src="/images/headshots/Headshot_One.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/Headshot_One.jpg")}
                            />
                            <Thumbnail
                                src="/images/headshots/Headshot_Two.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/Headshot_Two.jpg")}
                            />
                            <Thumbnail
                                src="/images/headshots/singing.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/singing.jpg")}
                            />
                            <Thumbnail
                                src="/images/headshots/IMG_20220512_211844~2.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/IMG_20220512_211844~2.jpg")}
                            />
                            <Thumbnail
                                src="/images/headshots/IMG_20220512_213052~2.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/IMG_20220512_213052~2.jpg")}
                            />
                            <Thumbnail
                                src="/images/headshots/IMG_20220606_220048.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/IMG_20220606_220048.jpg")}
                            />
                            <Thumbnail
                                src="/images/headshots/IMG_20220606_220110~2.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/IMG_20220606_220110~2.jpg")}
                            />
                            <Thumbnail
                                src="/images/headshots/IMG_20220606_220133.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/IMG_20220606_220133.jpg")}
                            />
                            <Thumbnail
                                src="/images/headshots/IMG_20221203_124444.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/IMG_20221203_124444.jpg")}
                            />
                            <Thumbnail
                                src="/images/headshots/IMG_20221203_125142.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/IMG_20221203_125142.jpg")}
                            />
                            <Thumbnail
                                src="/images/headshots/IMG_20221204_105242.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/IMG_20221204_105242.jpg")}
                            />
                            <Thumbnail
                                src="/images/headshots/IMG_20221204_105353.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/IMG_20221204_105353.jpg")}
                            />
                            <Thumbnail
                                src="/images/headshots/IMG_20230106_175322.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/IMG_20230106_175322.jpg")}
                            />
                            <Thumbnail
                                src="/images/headshots/IMG_20230109_131315.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/IMG_20230109_131315.jpg")}
                            />
                            <Thumbnail
                                src="/images/headshots/IMG_20230109_131357.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/IMG_20230109_131357.jpg")}
                            />
                            <Thumbnail
                                src="/images/headshots/IMG_20230109_131400.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/IMG_20230109_131400.jpg")}
                            />
                            <Thumbnail
                                src="/images/headshots/IMG_20230210_174418.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/IMG_20230210_174418.jpg")}
                            />
                            <Thumbnail
                                src="/images/headshots/IMG_20230210_174427.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/IMG_20230210_174427.jpg")}
                            />
                            <Thumbnail
                                src="/images/headshots/IMG_20230301_143557.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/IMG_20230301_143557.jpg")}
                            />
                            <Thumbnail
                                src="/images/headshots/IMG_20230308_104043.jpg"
                                onClick={() => setDisplayPhoto("/images/headshots/IMG_20230308_104043.jpg")}
                            />
                        </ThumbnailSection>
                        <PhotoSection>
                            <Photo src={displayPhoto} />
                        </PhotoSection>
                    </PhotoViewer>
                </Card>
            </ContentContainer>
        </Layout>
    );
};

export default PicsSection;
