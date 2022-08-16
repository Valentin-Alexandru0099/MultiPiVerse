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
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdownLink,
} from 'mdb-react-ui-kit';

import "./index.css";

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
                                    <section id='account-section'>
                                        <MDBDropdown>
                                            <MDBDropdownToggle id='username' tag='h5' className='nav-link'>
                                                {username}
                                                <MDBDropdownMenu>
                                                    <MDBDropdownItem>
                                                        <MDBDropdownLink href='inventory'><MDBIcon fas icon="suitcase" /> Inventory</MDBDropdownLink>
                                                    </MDBDropdownItem>
                                                    <MDBDropdownItem>
                                                        <MDBDropdownLink href='settings'><MDBIcon fas icon="cogs" /> Settings</MDBDropdownLink>
                                                    </MDBDropdownItem>
                                                    <hr className='dropdown-divider' />
                                                    <MDBDropdownItem>
                                                        <MDBDropdownLink onClick={logout} href='/'><MDBIcon fas icon="door-open" /> Logout</MDBDropdownLink>
                                                    </MDBDropdownItem>
                                                </MDBDropdownMenu>
                                            </MDBDropdownToggle>
                                        </MDBDropdown>
                                    </section>
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