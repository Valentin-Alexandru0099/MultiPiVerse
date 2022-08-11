export default function ResetPasswordModal() {
    
    return (
        <>
            <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Forget Password</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody style={{ textAlign: 'center' }}>
                            <p>Enter here your email address to reset your password!</p>
                            <form ref={passwordResetForm} onSubmit={(e) => { resetPassword(e) }} >
                                <MDBInputGroup className='mb-3' noBorder textBefore={<MDBIcon fas icon='envelope' />}>
                                    <MDBInput style={{ display: 'none' }} value={resetCode} name='resetCode' label="Email" className='form-control' type='password' />
                                    <MDBInput name='email' onChange={hanldePasswordChange} label="Email" className='form-control' type='email' />
                                    <MDBBtn color='secondary' type='submit'> Submit </MDBBtn>
                                </MDBInputGroup>
                            </form>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

