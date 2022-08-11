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
import "./landingPage.css";
import m from "../../images/m.png";
import pi from "../../images/pi.png";
import v from "../../images/v.png";
import infoGif from "../../images/info.gif";
import { useState } from 'react';
import ChampionsInfo from './champions';
import ItemsInfo from './items';
import MissionsInfo from './missions';
import RegisterForm from '../User/RegisterForm';
import { useEffect } from 'react';
import { userToken } from '../../Jotai/Atom';
import { useAtom } from 'jotai';

export default function HomePage() {


    const [token, setToken] = useAtom(userToken);

    useEffect(() => {
        console.log(token)
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
                <MDBCard id='info' alignment='center'>
                    <MDBCardBody>
                        <MDBCardTitle>Are you ready to start your adventure ?</MDBCardTitle>
                        <RegisterForm />
                    </MDBCardBody>
                </MDBCard>
            </header>
            <MDBCard id='info' className='w-50'>
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
                    </ul>
                </MDBCardBody>
            </MDBCard>
            <div className='card-end'>
                <MDBCard id='info' className='w-50' alignment='end'>
                    <MDBCardBody>
                        <MDBCardTitle>Turn based game adventure designed.</MDBCardTitle>
                        <MDBCardText> In memory of many GREAT turn based games, this came out of my imagination.</MDBCardText>
                        <img
                            src={infoGif}
                            alt="..."
                            width="100%"
                        >
                        </img>
                    </MDBCardBody>
                </MDBCard>
            </div>
            <section className='about-game'>
                <MDBTabs fill className='mb-3'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
                            Champions
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
                            Items
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
                            Missions
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>
                <MDBTabsContent>
                    <MDBTabsPane show={basicActive === 'tab1'}>
                        <ChampionsInfo />
                    </MDBTabsPane>
                    <MDBTabsPane show={basicActive === 'tab2'}>
                        <ItemsInfo />
                    </MDBTabsPane>
                    <MDBTabsPane show={basicActive === 'tab3'}>
                        <MissionsInfo />
                    </MDBTabsPane>
                </MDBTabsContent>
            </section>
        </>
    );
};