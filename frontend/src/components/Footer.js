import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTiktok } from 'react-icons/fa'; // Importing social media icons

const FooterContainer = styled.footer`
    background-color: #7b1f1f; /* Dark Red */
    color: white;
    padding: 40px 20px;
    text-align: center;
    font-family: 'Arial', sans-serif; /* Better font for readability */
    // bottom: 0;

    @media (max-width: 768px) {
        padding: 30px 15px; /* Adjust padding for smaller screens */
    }
        
//     @media (max-width: 550px) {
//        width: 100%; /* Adjust padding for smaller screens */
//     }
// `;

const HeartIcon = styled.span`
    font-size: 50px; /* Adjust size for more impact */
    color: #ffeb3b; /* Yellow color for visibility */

    @media (max-width: 768px) {
        font-size: 40px; /* Smaller icon size on mobile */
    }
`;

const Tagline = styled.h2`
    margin: 15px 0;
    font-weight: bold; /* Bold for emphasis */
    font-size: 24px; /* Larger font size for better visibility */

    @media (max-width: 768px) {
        font-size: 20px; /* Smaller font on mobile */
    }
`;

const Button = styled.button`
    padding: 12px 25px;
    border: none;
    border-radius: 30px; /* Rounded edges for a softer look */
    background-color: #b00000;
    color: white;
    font-size: 18px; /* Larger font size for the button */
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    margin: 20px 0;

    &:hover {
    background-color: rgb(158, 25, 18);
    color:white;
    transform: scale(1.05); /* Slight zoom effect on hover */
    }

    @media (max-width: 768px) {
        padding: 10px 20px; /* Adjust button padding for smaller screens */
        font-size: 16px; /* Adjust font size */
    }
`;

const SocialMediaIcons = styled.div`
    display: flex;
    justify-content: center;
    margin: 40px 0;
    gap: 20px; /* Space between icons */

    @media (max-width: 768px) {
        gap: 15px; /* Smaller gap on mobile */
    }
`;

const IconWrapper = styled.a`
    color: white; 
    font-size: 24px; /* Larger size for better visibility */
    transition: color 0.3s, transform 0.2s, background-color 0.3s;
    padding: 8px; /* Add padding for better click area */
    border-radius: 5px; /* Rounded corners for a softer look */

    &:hover {
        background-color: white; 
        color: #b00000; 
        transform: scale(1.1); 
    }

    @media (max-width: 768px) {
        font-size: 20px; /* Smaller icon size on mobile */
    }
`;

const BottomLinksContainer = styled.div`
    margin-top: 30px;
    font-size: 14px;

    @media (max-width: 768px) {
        font-size: 12px; /* Smaller font on mobile */
    }
`;

const BottomLink = styled.a`
    color: white;
    text-decoration: none;
    margin: 0 10px;
    transition: color 0.3s, text-decoration 0.3s;

    &:hover {
        color: white; 
        text-decoration: underline; 
    }

    @media (max-width: 768px) {
        margin: 0 5px; /* Smaller margin on mobile */
    }
`;

function Footer() {

    return (
        <FooterContainer>
            <HeartIcon>❤️</HeartIcon>
            <Tagline>Together, we can save lives.</Tagline>

            <SocialMediaIcons>
                <IconWrapper href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                </IconWrapper>
                <IconWrapper href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                </IconWrapper>
                <IconWrapper href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                </IconWrapper>
                <IconWrapper href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                </IconWrapper>
                <IconWrapper href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <FaYoutube />
                </IconWrapper>
                <IconWrapper href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                    <FaTiktok />
                </IconWrapper>
            </SocialMediaIcons>
            <BottomLinksContainer>
                <BottomLink href="/">Home</BottomLink>
                <BottomLink href="/about">About Us</BottomLink>
                <BottomLink href="/contact-us">Contact Us</BottomLink>
                <BottomLink href="/privacypolicy">Privacy Policy</BottomLink>
            </BottomLinksContainer>
        </FooterContainer>
    );
}

export default Footer;
