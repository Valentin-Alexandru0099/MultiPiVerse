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
import "../global.css";

import brand from "../../images/Brand.png";
import LoginForm from '../LoginForm/index';
import Avatar from '../Avatar';

import { useAtom } from 'jotai';
import { userToken, accountUsername, accountDetails, accountAvatar } from '../../Jotai/Atom';
import { RESET } from 'jotai/utils'

export default function Navbar() {

    const [showBasic, setShowBasic] = useState(false);
    const [token, setToken] = useAtom(userToken);
    const [username, setUsename] = useAtom(accountUsername);
    const [account, setAccount] = useAtom(accountDetails);
    const [avatar, setAvatar] = useAtom(accountAvatar);

    const logout = () => {
        setToken(RESET);
        setUsename(RESET);
        setAccount(RESET);
        setAvatar(RESET);
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
                                            <MDBNavbarLink id='c-yellow' href='map'>
                                                Map
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                        <MDBNavbarItem>
                                            <MDBNavbarLink id='c-yellow' href='town'>
                                                Town
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                        <MDBNavbarItem>
                                            <MDBNavbarLink id='c-yellow' href='shop'>
                                                Shop
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                        <MDBNavbarItem>
                                            <MDBNavbarLink id='c-yellow' href='arena'>
                                                Arena
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                    </MDBNavbarNav>
                                    <section id='account-section'>
                                        <div className='avatar-nav'>
                                            {account && (<><Avatar avatar={avatar} width="30" /></>)}
                                        </div>
                                        <MDBDropdown  >
                                            <MDBDropdownToggle  id='username' tag='h5' className='nav-link'>
                                                {username}
                                                <MDBDropdownMenu id="border-background" >
                                                    <MDBDropdownItem>
                                                        <MDBDropdownLink id='border-background'><MDBIcon fas icon="universal-access" /> Account options</MDBDropdownLink>
                                                    </MDBDropdownItem>
                                                    <MDBDropdownItem>
                                                        <MDBDropdownLink id='c-yellow'  href='user-page'><MDBIcon fas icon="cogs" /> Settings</MDBDropdownLink>
                                                    </MDBDropdownItem>
                                                    <MDBDropdownItem>
                                                        <MDBDropdownLink id='c-yellow' href='Champions'><MDBIcon fas icon="users" /> Champions</MDBDropdownLink>
                                                    </MDBDropdownItem>
                                                    <MDBDropdownItem>
                                                        <MDBDropdownLink id='c-yellow' href='Items'><MDBIcon fas icon="toolbox" /> Items</MDBDropdownLink>
                                                    </MDBDropdownItem>
                                                    <hr className='dropdown-divider' />
                                                    <MDBDropdownItem>
                                                        <MDBDropdownLink id='c-yellow' onClick={logout} href='/'><MDBIcon fas icon="door-open" /> Logout</MDBDropdownLink>
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