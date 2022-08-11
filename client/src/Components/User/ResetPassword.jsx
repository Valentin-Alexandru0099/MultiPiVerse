import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBBtn,
    MDBInputGroup,
    MDBInput,
    MDBIcon,

} from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import { useState } from 'react';
import { notify } from '../../App';
import { getData, putData } from '../../Fetcher/fetcher';
import "./ResetPassword.css";

export default function ResetPassword() {

    const [message, setMessage] = useState("");
    const [resetOn, setResetOn] = useState();
    const [formValues, setFormValues] = useState({
        password: "",
        confirmPassword: "",
    });

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);


    useEffect(() => {
        getData("users/findUserByResetCode/" + urlParams.get("resetCode"))
            .then((response) => {
                if (response.username) {
                    setResetOn(true);
                } else {
                    setMessage(response);
                    setResetOn(false);
                };
            });
    }, []);

    const handleChange = (e) => {
        e.persist();
        setFormValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };

    const resetPassword = (e) => {
        e.preventDefault();
        if (
            formValues.confirmPassword === ""
            || formValues.password === "") {
            notify("warn", "All fields required!");
        }
        if (formValues.confirmPassword !== formValues.password) {
            notify("warn", "Passwords does not match!");
            return;
        };
        putData("users/resetUserPassword/" + urlParams.get("resetCode"), formValues)
            .then((response) => {
                if (response === "Reset successfully!") {
                    setResetOn(false);
                    setMessage(response);
                } else {
                    notify("error", response);
                };
            });
    };

    return (
        <>
            <div style={{ margin: '10%' }}>
                <MDBCard style={{ backgroundColor: 'white' }} alignment='center'>
                    <MDBCardBody style={{ padding: '10%' }} >
                        {
                            resetOn
                                ? (
                                    <>
                                        <form className="reset-password-form" onSubmit={resetPassword}>
                                            <div>
                                                <MDBInputGroup className='mb-3' noBorder textBefore={<MDBIcon fas icon='envelope' />}>
                                                    <MDBInput name='password' onChange={handleChange} label="New Password" className='form-control' type='password' />
                                                </MDBInputGroup>
                                                <MDBInputGroup className='mb-3' noBorder textBefore={<MDBIcon fas icon='envelope' />}>
                                                    <MDBInput name='confirmPassword' onChange={handleChange} label="Confirm New Password" className='form-control' type='password' />
                                                </MDBInputGroup>
                                            </div>
                                            <MDBBtn color='secondary' size='lg'>Submit</MDBBtn>
                                        </form>
                                    </>
                                )
                                : (
                                    <>
                                        <MDBCardTitle>{message}</MDBCardTitle>
                                        <MDBBtn color='secondary' href='/'>Go To Main Page</MDBBtn>
                                    </>
                                )
                        }
                    </MDBCardBody>
                </MDBCard>
            </div>
        </>
    );
};