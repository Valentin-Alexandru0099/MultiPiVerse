import React, { useState } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBCollapse,
    MDBBtn,
    MDBNavbarLink,
    MDBNavbarItem,
} from 'mdb-react-ui-kit';

import brand from "../../images/Brand.png";
import LoginForm from '../LoginForm/index';

import { useAtom } from 'jotai';
import { userToken, accountUsername } from '../../Jotai/Atom';
import { RESET } from 'jotai/utils'

export default function Navbar() {

    const [showBasic, setShowBasic] = useState(false);
    const [token, setToken] = useAtom(userToken);
    const [username, setUsename] = useAtom(accountUsername);

    const logout = () => {
        setToken(RESET);
        window.location.href = "/";
    };

    return (
        <>
            {token
                ? (
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
                                        <MDBNavbarItem>
                                            <MDBNavbarLink href='map'>
                                                Map
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                        <MDBNavbarItem>
                                            <MDBNavbarLink href='town'>
                                                Town
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                        <MDBNavbarItem>
                                            <MDBNavbarLink href='shop'>
                                                Shop
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                        <MDBNavbarItem>
                                            <MDBNavbarLink href='arena'>
                                                Arena
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                        <MDBNavbarItem>
                                            <MDBNavbarLink href='inventory'>
                                                Inventory
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                    </MDBNavbarNav>
                                    <MDBNavbarLink href='user-page'>
                                        {username}
                                    </MDBNavbarLink>
                                    <MDBBtn onClick={logout} size='lg' color='secondary'>Logout</MDBBtn>
                                </MDBCollapse>
                            </MDBContainer>
                        </MDBNavbar>
                    </>
                )
                : (
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
                )
            }

        </>
    );
};