import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBCol,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';

export default function PageFooter() {
    return (
        <MDBFooter className='text-center' color='white' bgColor='dark'>
            <MDBContainer className='p-4'>
                <section className=''>
                    <MDBRow>
                        <MDBCol md='4' className='mb-4 mb-md-0'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon icon="tablet" className="me-3" />
                                About Web App
                            </h6>
                            <p>
                                Everything done in this project is done in purpose of learning.
                                All ideas are inspired from games I've played before.
                            </p>
                        </MDBCol>

                        <MDBCol md='4' className='mb-4 mb-md-0'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon icon="gamepad" className="me-3" />
                                About Me
                            </h6>
                            <p>
                                I'm a junior fullstack developer who is trying to combine
                                his gaming passion with web development.
                            </p>
                        </MDBCol>
                        <MDBCol md='4' className='mb-4 mb-md-0'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon icon="gem" className="me-3" />
                                Connect with me
                            </h6>
                            <ul className='list-unstyled mb-0'>
                                <li>
                                    <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                                        <MDBIcon fab icon='linkedin-in' />
                                    </MDBBtn>
                                </li>
                                <li>
                                    <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                                        <MDBIcon fab icon='github' />
                                    </MDBBtn>
                                </li>
                            </ul>
                        </MDBCol>
                    </MDBRow>
                </section>
            </MDBContainer>
            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                ?? 2022 Copyright:
                <a className='text-white' target="_blank" rel="noreferrer" href='https://github.com/Valentin-Alexandru0099'>
                    Dumitru Alexandru
                </a>
            </div>
        </MDBFooter>
    );
};