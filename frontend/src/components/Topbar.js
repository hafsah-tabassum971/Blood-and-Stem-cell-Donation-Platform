import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
    background-color: #ffffff;
    background-color: white; 
    padding: 0 30px;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
       

`;

const Nav = styled.div`
    display: flex;
    gap: 25px;
    font-size: 15px;
    color: #666;
    
    @media (max-width: 400px) {
    gap: 15px;
        font-size: 14px;

  }
`;

const NavItem = styled(Link)`
    cursor: pointer;
    color: #333;
    text-decoration: none;
    font-weight: 500;

    &:hover {
        color: gray;
        text-decoration: underline;
    }

`;

function Topbar() {
    return (
        <Container>
            <Nav>
                <NavItem to="/">Home</NavItem>
                <NavItem to="/about">About</NavItem>
                <NavItem to="/privacypolicy">Privacy Policy</NavItem>
                <NavItem to="/contact-us">Contact Us</NavItem>
            </Nav>
        </Container>
    );
}

export default Topbar;
