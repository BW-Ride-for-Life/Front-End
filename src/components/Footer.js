import React from 'react';
import {Container} from 'reactstrap';
import styled from 'styled-components';

const FooterDiv = styled.footer`
    padding: 1.5rem;
    // position: absolute;
    bottom: 0;
    width: 100%;
`

const Footer = () => {
    return (
        <FooterDiv className="bg-black mt-5">
            Copyright &copy; 2019
        </FooterDiv>
    )
}

export default Footer;