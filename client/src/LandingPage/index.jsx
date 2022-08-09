import {
    MDBRow,
    MDBCol,
    MDBTooltip,
} from 'mdb-react-ui-kit';
import "./landingPage.css";
import m from "../images/m.png";
import pi from "../images/pi.png";
import v from "../images/v.png";

export default function HomePage() {

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

                    <MDBRow>
                        <MDBCol md='4'>

                        </MDBCol>
                        <MDBCol md='4'>
                            <div id='PI-container' className='mb-3'>
                            </div>
                        </MDBCol>
                        <MDBCol md='4'>
                            <div id='V-container' className='mb-3'>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </div>
            </header>
        </>
    );
};