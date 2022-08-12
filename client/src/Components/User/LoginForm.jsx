import {
    MDBBtn,
    MDBInput,
    MDBInputGroup,
    MDBCol,
    MDBRow,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBIcon,
} from 'mdb-react-ui-kit';
import { useRef } from 'react';
import { useState } from 'react';
import { notify } from '../../App';
import { sendEmail } from '../../EmailJs/emailJs';
import { getData, postData } from '../../Fetcher/fetcher';
import { useAtom } from 'jotai';
import { userToken } from '../../Jotai/Atom';


export default function LoginForm() {

    const [token, setToken] = useAtom(userToken);
    const [resetCode, setResetCode] = useState("");
    const [centredModal, setCentredModal] = useState(false);
    const [resetPasswordField, setResetPasswordField] = useState({
        email: "",
    });

    const passwordResetForm = useRef();

    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
    });

    const toggleShow = (e) => {
        e.preventDefault();
        setCentredModal(!centredModal);
    };

    const hanldePasswordChange = (e) => {
        e.persist();
        setResetPasswordField({ email: e.target.value });
    };

    const handleChange = (e) => {
        e.persist();
        setFormValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };

    const resetPassword = (e) => {
        e.preventDefault();
        getData("users/generateResetPasswordCode/" + resetPasswordField.email)
            .then((response) => {
                if (response.resetCode) {
                    setResetCode(response.resetCode);
                    notify("succsess", "Email send for Password Reset!");
                    setTimeout(() => {
                        sendEmail('reset-password', passwordResetForm.current);
                    }, 1000)
                } else {
                    notify("error", response);
                };
            });
    };


    const login = (e) => {
        e.preventDefault();
        if (formValues.username === "" || formValues.password === "") {
            notify("warn", "All fields required!");
            return;
        }
        postData("users/login", formValues)
            .then((response) => {
                console.log(response);
                if (response.token) {
                    setToken(response.token);
                } else {
                    notify("error", response);
                };

            });
    };

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
            <MDBInputGroup onSubmit={login} tag="form" className='w-auto mb-3'>
                <MDBRow>
                    <MDBCol>
                        <MDBInputGroup className='mb-3' noBorder textBefore>
                            <MDBInput style={{ backgroundColor: 'white' }} name='username' onChange={handleChange} label="Username" className='form-control' type='text' />
                        </MDBInputGroup>
                    </MDBCol>
                    <MDBCol>
                        <MDBInputGroup className='mb-3' noBorder textBefore>
                            <MDBInput style={{ backgroundColor: 'white' }} name='password' onChange={handleChange} label="Password" className='form-control' type='password' />
                        </MDBInputGroup>
                    </MDBCol>
                    <MDBCol>
                        <MDBInputGroup className='mb-3' noBorder textBefore>
                            <MDBBtn color='secondary' type='submit' block size='lg'>Login</MDBBtn>
                            <a style={{ whiteSpace: 'nowrap' }} onClick={(e) => { toggleShow(e) }} href="/">Forget Password?</a>
                        </MDBInputGroup>
                    </MDBCol>
                </MDBRow>
            </MDBInputGroup>
        </>
    );
};