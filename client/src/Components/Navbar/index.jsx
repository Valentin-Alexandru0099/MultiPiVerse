import React, { useState } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBCollapse,
} from 'mdb-react-ui-kit';
import brand from "../../images/Brand.png";
import LoginForm from '../User/LoginForm';

export default function Navbar() {
    const [showBasic, setShowBasic] = useState(false);

    return (
        <>
            <MDBNavbar expand='lg' bgColor='dark' dark>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='/' src={brand}>
                        <img
                            src={brand}>
                        </img>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowBasic(!showBasic)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBCollapse navbar show={showBasic}>
                        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                        </MDBNavbarNav>
                        <LoginForm />
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
};