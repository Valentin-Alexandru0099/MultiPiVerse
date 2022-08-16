import React, { useState } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBCollapse,
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
import Avatar from '../Avatar';

import { useAtom } from 'jotai';
import { userToken, accountUsername, accountDetails } from '../../Jotai/Atom';
import { RESET } from 'jotai/utils'

export default function Navbar() {

    const [showBasic, setShowBasic] = useState(false);
    const [token, setToken] = useAtom(userToken);
    const [username, setUsename] = useAtom(accountUsername);
    const [account, setAccount] = useAtom(accountDetails);

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
                                    </MDBNavbarNav>
                                    <section id='account-section'>
                                        <div className='avatar-nav'>
                                            {account && (<><Avatar avatar={account.avatar} width="30" /></>)}
                                        </div>
                                        <MDBDropdown>
                                            <MDBDropdownToggle id='username' tag='h5' className='nav-link'>
                                                {username}
                                                <MDBDropdownMenu>
                                                    <MDBDropdownItem>
                                                        <MDBDropdownLink href='user-page'><MDBIcon fas icon="cogs" /> Settings</MDBDropdownLink>
                                                    </MDBDropdownItem>
                                                    <MDBDropdownItem>
                                                        <MDBDropdownLink href='Champions'><MDBIcon fas icon="users" /> Champions</MDBDropdownLink>
                                                    </MDBDropdownItem>
                                                    <MDBDropdownItem>
                                                        <MDBDropdownLink href='Items'><MDBIcon fas icon="toolbox" /> Items</MDBDropdownLink>
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