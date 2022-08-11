import {
    MDBBtn,
    MDBInput,
    MDBListGroupItem,
    MDBListGroup,
    MDBInputGroup,
    MDBIcon,
} from 'mdb-react-ui-kit';
import { useRef } from 'react';
import { useState } from 'react';
import { notify } from '../../App';
import { postData } from '../../Fetcher/fetcher';
import { sendEmail } from "../../EmailJs/emailJs";

export default function RegisterForm() {

    const form = useRef();
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
    });
    const [activationCode, setActivationCode] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (fieldsEmpty()) {
            notify("warn", "All fields are required!");
            return;
        };
        if (!passwordsMatch()) {
            notify("warn", "Passwords does not match!");
            return;
        };
        postData("users/register", formValues)
            .then(response => {
                if (!response.username) {
                    notify("error", response);
                } else {
                    setActivationCode("http://localhost:3000/activate?activationCode=" + response.activationCode);
                    notify("", "Generating verification code... ")
                    setTimeout(() => {
                        notify("success", "Account created, email sent!");
                        sendEmail("registration", form.current);
                    }, 1000)
                };
            });
    };

    const handleChange = (e) => {
        e.persist();
        setFormValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };

    const fieldsEmpty = () => {
        return true ?
            formValues.username === ""
            || formValues.email === ""
            || formValues.confirmPassword === ""
            || formValues.password === ""
            : false;
    };

    const passwordsMatch = () => {
        return true ? formValues.confirmPassword === formValues.password : false;
    };

    return (
        <>
            <form ref={form} onSubmit={handleSubmit} className='register-form'>
                <MDBListGroup flush>
                    <MDBListGroupItem>
                        <MDBInputGroup className='mb-3' noBorder textBefore={<MDBIcon fas icon='user-circle' />}>
                            <MDBInput name='username' onChange={handleChange} label="Username" className='form-control' type='text' />
                        </MDBInputGroup>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                        <MDBInputGroup className='mb-3' noBorder textBefore={<MDBIcon fas icon='envelope' />}>
                            <MDBInput name='email' onChange={handleChange} label="Email" className='form-control' type='email' />
                        </MDBInputGroup>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                        <MDBInputGroup className='mb-3' noBorder textBefore={<MDBIcon fas icon='unlock-alt' />}>
                            <MDBInput name='password' onChange={handleChange} label="Password" className='form-control' type='password' />
                        </MDBInputGroup>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                        <MDBInputGroup className='mb-3' noBorder textBefore={<MDBIcon fas icon='unlock-alt' />}>
                            <MDBInput name='confirmPassword' onChange={handleChange} label="Confirm Password" className='form-control' type='password' />
                        </MDBInputGroup>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                        <a href='/login'>Already have an account?</a>
                        <input style={{ display: 'none' }} name='activationCode' defaultValue={activationCode} />
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                        <MDBBtn color='secondary' type='submit'>Join now!</MDBBtn>
                    </MDBListGroupItem>
                </MDBListGroup>
            </form>
        </>
    );
};