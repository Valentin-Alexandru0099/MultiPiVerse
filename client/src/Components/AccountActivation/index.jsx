import { useState, useEffect } from "react";
import { getData } from "../../Fetcher/fetcher";
import "../global.css";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
} from 'mdb-react-ui-kit';

export default function AccountActivation() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const [code, setCode] = useState("")
    const [message, setMessage] = useState("");

    useEffect(() => {
        setCode(urlParams.get("activationCode"));
        if (code) {
            getData("users/activate-account/" + code)
                .then((response) => {
                    setMessage(response);
                });
        }
    }, [code]);

    return (
        <>
            <div id="border" style={{ margin: '10%' }}>
                <MDBCard style={{ backgroundColor: 'white' }} alignment='center'>
                    <MDBCardBody id="border-background" style={{ padding: '10%' }} >
                        <MDBCardTitle>{message}</MDBCardTitle>
                        <MDBBtn color='secondary' href='/'>Go To Main Page</MDBBtn>
                    </MDBCardBody>
                </MDBCard></div>
        </>
    );
};