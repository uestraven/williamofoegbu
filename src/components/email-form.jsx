import React, { useState } from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';

import{ init, send } from 'emailjs-com';
init("user_jWMhw2EuEolWP0VGHeyrB");

const FormWrapper = styled('div')`
    display: flex;
    flex-direction: row;
    gap: 25px;
    width: 100%;
    @media only screen and (max-width: 1165px) {
        flex-direction: column-reverse;
    }
`;

const SocialMediaSection = styled('div')`
    width: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    gap: 5px;
    @media only screen and (max-width: 1165px) {
        width: 100%;
        flex-direction: row;
    }
`;

const Icon = styled('img')`
    height: auto;
    cursor: pointer;
`;

const ContactForm = styled('div')`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const ContactInput = styled('input')`
    height: 30px;
    ::placeholder {
        font-size: 14px;
        opacity: 1;
    }
    @media only screen and (max-width: 1165px) {
        height: 50px;
    }
`;

const ContactTextArea = styled('textarea')`
    height: 150px;
    resize: none;
    ::placeholder {
        font-size: 14px;
        opacity: 1;
    }
    @media only screen and (max-width: 1165px) {
        height: 200px;
    }
`;

const ContactBottomRow = styled('div')`
    display: flex;
    @media only screen and (max-width: 1165px) {
        flex-direction: column;
        gap: 10px;
    }
`;

const ContactFormSubmitButton = styled('button')`
      min-width: 100px;
      height: 40px;
      background: #ffa0c2;
      border-radius: 3px;
      border: none;
      color: white;
      :active {
          background: #ff54a5;
      }
      @media only screen and (max-width: 1165px) {
        width: 100%;
        height: 50px;
      }
`;

const ContactFormAlert = styled('div')`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      font-size: 18px;
      font-weight: 600;
      &.error {
          color: #ff54a5;
      }
      &.success {
          color: #5bcaff;
      }
`;

const socialMedias = [
    {icon: '/images/icons/YT.webp', url: 'https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCSAI13Tr1KpQHPfVTabAVMQ%3Ffbclid%3DIwAR2jb-1offZytsvAwv8N7iZ8S6WZwOVlLCHGJ6Y4ccyXn4qrlo-4Xb0uRGY&h=AT3HWIzxXXA_KsLIZggWAPW84fhbycL1aQTkCjVE0_ZYQvCuVtAbiTKsskOlSkxn8tQlottctFrB6OoIq2hD7LjmPi2aSC9vdUBGPsO-an_sAWiNKPjeIhsUXGqGqtuEznCGj39p4aj643343tw'},
    {icon: '/images/icons/FB.webp', url: 'https://www.facebook.com/WilliamOfoegbuVO'},
    {icon: '/images/icons/Tumblr.webp', url: 'http://gooddemongonebad.tumblr.com'},
    {icon: '/images/icons/twitter.webp', url: 'https://twitter.com/William_Ofoegbu'},
    // {icon: '/images/icons/linkedin.webp', url: 'https://www.linkedin.com/in/william-ofoegbu-08160a221/'}
];

const EmailForm = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [subject, setSubject] = useState();
    const [message, setMessage] = useState();
    const [alert, setAlert] = useState({ msg: undefined, error: false });

    const openSite = (url) => {
        window.open(url, '_blank');
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const isValidEmail = (email) => {
        console.log('email is', email);
        if (!email) return false;
        const trimmedEmail = email.trim();
        return trimmedEmail && trimmedEmail.indexOf('@') > -1 && trimmedEmail.indexOf('.') > -1;
    };

    const clearAll = () => {
        document.getElementById('contact-name').value = '';
        setName();

        document.getElementById('contact-email').value = '';
        setEmail();

        document.getElementById('contact-subject').value = '';
        setSubject();

        document.getElementById('contact-message').value = '';
        setMessage();
    };

    const setSuccess = () => {
        setAlert({ msg: 'Success!', error: false });
        setTimeout(() => {
            setAlert({ msg: undefined, error: false });
        }, 5000);
    };

    const handleSubmit = () => {
        if (!name) {
            setAlert({ msg: 'Please enter a Name.', error: true });
        } else if (!email || typeof email === 'undefined') {
            setAlert({ msg: 'Please enter an Email.', error: true });
        } else if (!isValidEmail(email)) {
            setAlert({ msg: 'Please enter a valid Email.', error: true });
        } else if (!subject) {
            setAlert({ msg: 'Please enter a Subject.', error: true });
        } else if (!message) {
            setAlert({ msg: 'Please enter a Message.', error: true });
        } else {
            send(
                'service_q0f8rj9',
                'template_v631e2q',
                {
                    subject,
                    from_name: name,
                    from_email: email,
                    message
                }
            );
            setSuccess();
            clearAll();
        }
    };

    const handleSocialMediaClick = (url) => {
        ReactGA.event({
            category: 'Social Media Click',
            action: `Visited social media URL: ${url}`
        });
        openSite(url);
    };

    const { msg, error } = alert;
    return (
        <FormWrapper>
            <SocialMediaSection>
                {socialMedias.map((social) => {
                    const { icon, url } = social;
                    return (
                        <Icon
                            src={icon}
                            key={`icon_${url}`}
                            onClick={() => handleSocialMediaClick(url)}
                        />
                    );
                })}
            </SocialMediaSection>
            <ContactForm>
                <ContactInput
                    id="contact-name"
                    placeholder="NAME"
                    onChange={handleNameChange}
                />
                <ContactInput
                    id="contact-email"
                    placeholder="EMAIL"
                    onChange={handleEmailChange}
                />
                <ContactInput
                    id="contact-subject"
                    placeholder="SUBJECT"
                    onChange={handleSubjectChange}
                />
                <ContactTextArea
                    id="contact-message"
                    placeholder="MESSAGE"
                    onChange={handleMessageChange}
                />
                <ContactBottomRow>
                    <ContactFormSubmitButton
                        type="button"
                        onClick={handleSubmit}
                    >
                        SEND
                    </ContactFormSubmitButton>
                    <ContactFormAlert
                        className={ error ? 'error' : 'success' }
                    >
                        {msg}
                    </ContactFormAlert>
                </ContactBottomRow>
            </ContactForm>
        </FormWrapper>
    );
};

export default EmailForm;