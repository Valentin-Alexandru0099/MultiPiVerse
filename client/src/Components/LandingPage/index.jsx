import {
    MDBRow,
    MDBCol,
    MDBTooltip,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
} from 'mdb-react-ui-kit';
import "./index.css";
import "../global.css";
import m from "../../images/m.png";
import pi from "../../images/pi.png";
import v from "../../images/v.png";
import { useState, useEffect } from 'react';

import RegisterForm from '../RegisterForm/index';
import ChampionInfo from '../ChampionInfo/index';
import ItemInfo from '../ItemInfo/index';
import MissionInfo from '../MissionInfo/index';

import { userToken } from '../../Jotai/Atom';
import { useAtom } from 'jotai';

export default function HomePage() {


    const [token, setToken] = useAtom(userToken);

    useEffect(() => {
        if (token) {
            window.location.href = '/user-page';
        };
    }, []);

    const [basicActive, setBasicActive] = useState('tab1');

    const handleBasicClick = (value) => {
        if (value === basicActive) {
            return;
        }
        setBasicActive(value);
    };

    return (
        <>
            <header>
                <div className='p-5 text-center'>
                    <MDBRow>
                        <MDBCol md='4'>
                            <MDBTooltip tag='div' placement='bottom'
                                title={
                                    <>
                                        <strong>M</strong>ultiple as for a mass of something
                                    </>
                                }>
                                <div
                                    id="M"
                                    className='mb-3'>
                                    <img
                                        width="50%"
                                        src={m}
                                        alt="M"
                                    />
                                </div>
                            </MDBTooltip>
                        </MDBCol>
                        <MDBCol md='4'>
                            <MDBTooltip tag='div' placement='bottom'
                                title={
                                    <>
                                        <strong>Pi</strong>xel art is either created by me or downloaded.
                                    </>
                                }>
                                <div
                                    id='PI'
                                    className='mb-3'>
                                    <img
                                        width="50%"
                                        src={pi}
                                        alt="M"
                                    />
                                </div>
                            </MDBTooltip>
                        </MDBCol>
                        <MDBCol md='4'>
                            <MDBTooltip tag='div' placement='bottom'
                                title={
                                    <>
                                        <strong>V</strong>erse from universes involved in this game.
                                    </>
                                }>
                                <div
                                    id='V'
                                    className='mb-3'>
                                    <img
                                        width="50%"
                                        src={v}
                                        alt="V"
                                    />
                                </div>
                            </MDBTooltip>
                        </MDBCol>
                    </MDBRow>
                </div>
            </header>

            <section className='register-section'>
                <section id='border'>
                    <MDBCard id='border-background' alignment='center'>
                        <MDBCardBody >
                            <MDBCardTitle>Are you ready to start your adventure ?</MDBCardTitle>
                            <RegisterForm />
                        </MDBCardBody>
                    </MDBCard>
                </section>
                <section id='border'>
                    <MDBCard id='border-background'>
                        <MDBCardBody>
                            <MDBCardTitle>Why would You play this game ? </MDBCardTitle>
                            <ul>
                                <li>
                                    <MDBCardText>Run on browser, no need to download;</MDBCardText>
                                </li>
                                <li>
                                    <MDBCardText>Bug free;</MDBCardText>
                                </li>
                                <li>
                                    <MDBCardText>In game purchases;</MDBCardText>
                                </li>
                                <li>
                                    <MDBCardText>Play as much as you like!</MDBCardText>
                                </li>
                                <li>
                                    <MDBCardText>champions to change your gameplay</MDBCardText>
                                </li>
                                <li>
                                    <MDBCardText>Lots of items to equip your champions!</MDBCardText>
                                </li>
                                <li>
                                    <MDBCardText>Campaign with over  missions to complete!</MDBCardText>
                                </li>
                            </ul>
                        </MDBCardBody>
                    </MDBCard>
                </section>
            </section>
            <section id='border'>
                <div id='border-background'>
                    <MDBTabs fill className='mb-3'>
                        <MDBTabsItem>
                            <MDBTabsLink color='info' onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
                                Champions
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink color='info' onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
                                Items
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink color='info' onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
                                Missions
                            </MDBTabsLink>
                        </MDBTabsItem>
                    </MDBTabs>
                    <MDBTabsContent>
                        <MDBTabsPane id='border-background' show={basicActive === 'tab1'}>
                            <ChampionInfo />
                        </MDBTabsPane>
                        <MDBTabsPane id='border-background' show={basicActive === 'tab2'}>
                            <ItemInfo />
                        </MDBTabsPane>
                        <MDBTabsPane id='border-background' show={basicActive === 'tab3'}>
                            <MissionInfo />
                        </MDBTabsPane>
                    </MDBTabsContent>
                </div>
            </section>
        </>
    );
};