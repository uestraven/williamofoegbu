import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import NavBar from '../components/nav-bar';
import DemosSection from '../sections/demos';
import AboutMeSection from '../sections/about-me';
import ContactSection from '../sections/contact';
import PicsSection from '../sections/pics';
import ResumeSection from '../sections/resume';
import TestimonialsSection from '../sections/testimonials';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-199513499-1');

const BackgroundScroller = dynamic(import('../components/scroll-provider.jsx'), { ssr: false });

const MainContent = styled('main')`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  font-family: Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif;
  position: relative;
`;

const PageContent = styled('div')`
  margin-top: 300px;
  display: flex;
  flex-direction: column;
  gap: 100px;
`;

const Footer = styled('footer')`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  border-top: 1px solid #eaeaea;
  position: relative;
  @media only screen and (max-width: 1165px) {
    height: 200px;
  }
`;

const FooterContent = styled('div')`
  width: 90vw;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 10px;
  font-size: 14px;
`;

const AlertContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DismissableAlert = styled('div')`
    height: 110px;
    width: 80%;
    z-index: 100;
    color: black;
    background-color: #5bcaff;
    color: #000000;
    font-size: 32px;
    position: fixed;
    bottom: -500px;
    border-radius: 25px;
    display: flex;
    padding: 10px;
    box-shadow: 0 16px 32px 0 rgba(0,0,0,0.2);
    border: 2px solid #53c2f7;

    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;

    @media only screen and (max-width: 1165px) {
      height: 250px;
      flex-direction: column-reverse;
    }
`;

const AlertContent = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 1165px) {
    flex-direction: column;
    font-size: 16px;
  }
`;

const AlertCloseButton = styled('div')`
  width: 3%;
  cursor: pointer;
  @media only screen and (max-width: 1165px) {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
`;

const CasaCon = styled('img')`
  padding: 0 10px;
`;

const CasaLogo = styled('img')`
  cursor: pointer;
`;

const Tooltip = styled('span')`
  opacity: 0;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;

  position: absolute;
  top: -55px;
  left: -30px;
  font-size: 20px;
  padding: 10px;
  border-radius: 25px;
  background-color: white;
  box-shadow: 0 16px 32px 0 rgba(0,0,0,0.2);
  ::after {
    content: '';
    position: absolute;
    left: 38%;
    top: 100%;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 15px solid white;
    clear: both;
  }

  @media only screen and (max-width: 1165px) {
    top: 95px;
  }
`;

const WilliamOfoegbu = ({ origin }) => {
  ReactGA.pageview('/', undefined, origin);

  const bgColorMap = {
    white: '#ffffff',
    lavender: '#c8bfe7',
    purple: '#a349a4',
    green: '#008040',
    seaFoam: '#52feb5',
    blue:'#5bcaff'
  };
  const [bgColor, setBgColor] = useState(bgColorMap.white);
  const [navBarOpen, setNavBarOpen] = useState('open');

  const [resumeInView, setResumeInView] = useState(false);
  const [picsInView, setPicsInView] = useState(false);
  const [aboutMeInView, setAboutMeInView] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const [testimonialInView, setTestimonialInView] = useState(false);

  const handleScroll = () => {
    const scrollThresholds = {
      demos: { desktop: 40, mobile: 200 },
      resume: { desktop: 515, mobile: 1245 },
      pics: { desktop: 1505, mobile: 2120 },
      aboutMe: { desktop: 2110, mobile: 3125 },
      contact: { desktop: 3100, mobile: 4920 },
      testimonials: { desktop: 2600, mobile: 1000 },
    };
    const bgColorMap = {
      white: '#ffffff',
      lavender: '#c8bfe7',
      purple: '#a349a4',
      green: '#008040',
      seaFoam: '#52feb5',
      blue:'#5bcaff'
    };

    const { scrollY, innerWidth } = window;
    const device = innerWidth <= 1165 ? 'mobile' : 'desktop';

    const isWithinThreshold = (start, end) => {
      console.log(start);
      const startThreshold = scrollThresholds[start][device];
      console.log(startThreshold);
      const endThreshold = end ? scrollThresholds[end][device] : Number.MAX_SAFE_INTEGER;
      console.log(endThreshold);
      console.log(scrollY >= startThreshold && scrollY < endThreshold);
      return scrollY >= startThreshold && scrollY < endThreshold;
    }

    setNavBarOpen(scrollY >= 40 ? 'collapse' : 'open');

    if (isWithinThreshold('demos', 'resume')) {
      if (bgColor !== bgColorMap.lavender) setBgColor(bgColorMap.lavender);
      ReactGA.pageview('Demos');
    } else if (isWithinThreshold('resume', 'pics')) {
      if (bgColor !== bgColorMap.purple) setBgColor(bgColorMap.purple);
      if (!resumeInView) setResumeInView(true);
      ReactGA.pageview('Resume');
    } else if (isWithinThreshold('pics', 'aboutMe')) {
      if (bgColor !== bgColorMap.green) setBgColor(bgColorMap.green);
      if (!picsInView) setPicsInView(true);
      ReactGA.pageview('Pics');
    } else if (isWithinThreshold('aboutMe', 'testimonials')) {
      if (bgColor !== bgColorMap.seaFoam) setBgColor(bgColorMap.seaFoam);
      if (!aboutMeInView) setAboutMeInView(true);
      ReactGA.pageview('About me');
    } else if (isWithinThreshold('testimonials', 'contact')) {
      console.log('we here');
      if (!testimonialInView) setTestimonialInView(true);
    } else if (isWithinThreshold('contact', null)) {
      if (bgColor !== bgColorMap.blue) setBgColor(bgColorMap.blue);
      if (!contactInView) setContactInView(true);
      ReactGA.pageview('Contact');
    } else {
      setBgColor(bgColorMap.white);
    }
  };

  const handleCasaConClick = () => {
    window.open('https://princeoftennismovie.com/', '_blank').focus();
  };

  const handle = (bottom) => {
    const alertEl = document.getElementById('alert');
    if (alertEl) {
      alertEl.style.bottom = bottom;
    }
  };

  const tooltipFade = (opacity) => {
    const tooltipEl = document.getElementById('tooltip');
    if (tooltipEl) {
      tooltipEl.style.opacity = opacity;
    }
  }

  useEffect(() => {
    setTimeout(() => {
      handle('25px');
    }, 1000);
    setTimeout(() => {
      tooltipFade(1);
    }, 2000);
    setTimeout(() => {
      tooltipFade(0);
    }, 7000);
  }, []);

  return (
    <>
      <Head>
        <title>William Ofoegbu</title>
        <meta name="description" content="William Ofoegbu: The Voice Actor You Can Depend On" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="fb:app_id" content="188282173224378" />

        <meta property="og:url" content="http://williamofoegbu.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="William Ofoegbu: The Voice Actor You Can Depend On" />
        <meta property="og:description" content="William Ofoegbu's Personal Site" />
        <meta property="og:image" content="https://williamofoegbu.com/images/williamosamplecolor.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="William Ofoegbu: The Man, the Myth, the Legend" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:domain" content="williamofoegbu.com" />
        <meta name="twitter:url" content="http://williamofoegbu.com" />
        <meta name="twitter:site" content="@William_Ofoegbu" />
        <meta name="twitter:creator" content="@William_Ofoegbu" />
        <meta name="twitter:title" content="William Ofoegbu: The Voice Actor You Can Depend On" />
        <meta name="twitter:description" content="William Ofoegbu's Personal Site" />
        <meta name="twitter:image" content="https://williamofoegbu.com/images/williamosamplecolor.png" />
        <meta name="twitter:image:alt" content="William Ofoegbu: The Man, the Myth, the Legend" />
      </Head>

      <NavBar open={navBarOpen} />
      <BackgroundScroller
        bgColor={bgColor}
        onScroll={handleScroll}
      />
        <AlertContainer>
          <DismissableAlert id="alert">
            {/* <Tooltip id="tooltip">Check it out!</Tooltip> */}
            <CasaLogo style={{ cursor: 'pointer'}} src="/images/ryomalogo.png" onClick={handleCasaConClick} />
            <AlertContent>
              <div><b>{'Check out William as Boo in the smash hit: Ryoma! The Prince of Tennis <Decide>!'}</b></div>
              <div><b>In theaters May 12!</b></div>
              {/* JOIN WILLIAM OFOEGBU LIVE AT <CasaCon height="50" src="/images/casacon.png" /> (DEC 17-19) */}
            </AlertContent>
            <AlertCloseButton onClick={() => handle('-500px')}>&#10006;</AlertCloseButton>
          </DismissableAlert>
        </AlertContainer>
        <MainContent>
          <PageContent id="page-content">
            <DemosSection inView />
            <ResumeSection inView={resumeInView} />
            <PicsSection inView={picsInView} />
            <AboutMeSection inView={aboutMeInView} />
            <TestimonialsSection inView={testimonialInView} />
            <ContactSection inView={contactInView} />
          </PageContent>
        </MainContent>
        <Footer>
          <FooterContent>
            Voice over recording from DC Universe Online provided courtesy of DC Comics and Sony Online
            Entertainment LLC. DC UNIVERSE ONLINE software © 2011 Sony Online Entertainment LLC. © 2011
            DC Comics. DC UNIVERSE and all related characters and elements are trademarks of and © DC Comics.
          </FooterContent>
        </Footer>
    </>
  )
};

export default WilliamOfoegbu;
