import React, { useState } from 'react';
import styled from 'styled-components';
import { Sling as Hamburger } from 'hamburger-react';

const NavBarWrapper = styled('div')`
  z-index: 4;
  position: fixed;
  width: 100%;
  min-height: 40px;
  top: 0;
  left: 0;
  transition: all .8s;
  box-shadow: 0 0 34.4px 8.6px rgb(0 0 0 / 19%);
  padding: 5px 0;
  background-color: white;
  display: flex;
  justify-content: center;
  img {
      height: 250px;
  }
  .collapse {
    animation: collapse .5s ease forwards;
    img {
      transition: all .5s ease-out;
      opacity: 0;
    }
  }
  .open {
    animation: open .5s ease forwards;
    img {
      transition: all .5s ease-in;
      opacity: 1;
    }
  }

  .mobile-content {
    display: none;
  }

  @media only screen and (max-width: 1165px) {
    justify-content: flex-end;
    img {
        height: 175px;
    }
    .desktop-content {
      display: none;
    }
    .mobile-content {
      display: block;
    }
  }
`;

const NavBarContent = styled('div')`
  display: flex;
  align-items: flex-end;
  @media only screen and (max-width: 1165px) {
      width: 100%;
      justify-content: center;
  }
`;

const NavLinkContainer = styled('div')`
  display: flex;
  gap: 5px;
  z-index: 3;
`;

const MobileNavLinkContainer = styled(NavLinkContainer)`
  flex-direction: column;
  gap: 25px;
  marginTop: -50px;
  button:last-child {
    margin-bottom: 50px;
  }
`;

const NavLink = styled('button')`
  font-weight: bold;
  font-family: Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif;
  font-size: 18px;
  border: none;
  background-color: unset;
  cursor: pointer;
  :hover {
    transform: translateX(0);
      &::before {
        transform: translateX(0);
      }
    color: #5bcaff;
    transition: all .5s;
  }
`;

const NavLinkShine = styled('button')`
  font-weight: bold;
  font-family: Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif;
  font-size: 18px;
  border: none;
  background-color: unset;
  cursor: pointer;
  :hover {
    background: linear-gradient(to right, #6666ff, #0099ff , #00ff00, #ff3399, #6666ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: rainbow_animation 6s ease-in-out infinite;
    background-size: 400% 100%;
    mask-image: linear-gradient(-75deg, rgba(0,0,0,.6) 30%, #000 50%, rgba(0,0,0,.6) 70%);
    mask-size: 200%;
    animation: shine 1s infinite;
  }
  
  @keyframes shine {
    from {
      mask-position: 150%;
    }
    
    to {
      mask-position: -50%;
    }
  }
`;

const MobileNavLink = styled(NavLink)`
  color: #fff;
`;

const NavLinkDivider = styled('hr')`
  transform: rotate(90deg);
`;

const MobileNav = styled('div')`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 50px;
  left: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(24, 39, 51, 0.85);
  transition: all 0.4s ease;
`;

const setBodyScroll = (flag) => {
    document.documentElement.style.overflow = !flag ? 'hidden' : 'auto';
};

const NavBar = ({ open }) => {
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);

    const handleMobileNavOpen = () => {
        setMobileNavOpen(!isMobileNavOpen);
        // disable scroll
        setBodyScroll(isMobileNavOpen);
    };

    const handleMobileNavClick = (id) => {
      scrollTo(id);
      setMobileNavOpen(false);
      setBodyScroll(true);
    };

    const scrollTo = (id) => {
      const yOffset = -100;
      const element = document.getElementById(id);
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    };

    return (
        <NavBarWrapper>
          <NavBarContent className={`${open}`}>
            <img src="/images/commissionwilliamo_combined.png" />
            <div className="mobile-content" style={{ zIndex: 3, height: '100%', position: 'absolute', top: 0, right: 0 }}>
                <Hamburger
                    toggled={isMobileNavOpen}
                    toggle={handleMobileNavOpen}
                />
            </div>
            <NavLinkContainer className="desktop-content">
              <NavLinkShine onClick={() => window.scrollTo({top: 80, behavior: 'smooth'})}>
                DEMOS
              </NavLinkShine>
              <NavLinkDivider />
              <NavLinkShine onClick={() => scrollTo('resume')}>R&Eacute;SUM&Eacute;</NavLinkShine>
              <NavLinkDivider />
              <NavLinkShine onClick={() => scrollTo('pics')}>PICS</NavLinkShine>
              <NavLinkDivider />
              <NavLinkShine onClick={() => scrollTo('about-me')}>ABOUT ME</NavLinkShine>
              <NavLinkDivider />
              <NavLinkShine onClick={() => scrollTo('testimonials')}>CLIENTS</NavLinkShine>
              <NavLinkDivider />
              <NavLinkShine onClick={() => scrollTo('contact')}>CONTACT</NavLinkShine>
            </NavLinkContainer>
            <MobileNav style={{ display: isMobileNavOpen ? 'flex' : 'none' }}>
              <MobileNavLinkContainer>
                <MobileNavLink onClick={() => handleMobileNavClick('demos')}>
                  DEMOS
                </MobileNavLink>
                <MobileNavLink onClick={() => handleMobileNavClick('resume')}>
                  R&Eacute;SUM&Eacute;
                </MobileNavLink>
                <MobileNavLink onClick={() => handleMobileNavClick('pics')}>
                  PICS
                </MobileNavLink>
                <MobileNavLink onClick={() => handleMobileNavClick('about-me')}>
                  ABOUT ME
                </MobileNavLink>
                <MobileNavLink onClick={() => handleMobileNavClick('testimonials')}>
                  CLIENTS
                </MobileNavLink>
                <MobileNavLink onClick={() => handleMobileNavClick('contact')}>
                  CONTACT
                </MobileNavLink>
              </MobileNavLinkContainer>
            </MobileNav>
          </NavBarContent>
        </NavBarWrapper>
    );
};

export default NavBar;
