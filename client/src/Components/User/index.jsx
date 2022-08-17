import { useEffect } from "react";
import { accountUsername, userToken, accountDetails, accountAvatar } from '../../Jotai/Atom';
import { useAtom } from 'jotai';
import { getData, putData } from "../../Fetcher/fetcher";
import Avatar from "../Avatar";
import "./index.css";
import "../global.css";
import {
    MDBCard,
    MDBContainer,
    MDBCardBody,
    MDBCardHeader,
    MDBCardFooter,
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
} from "mdb-react-ui-kit";
import { useState, useRef } from "react";
import { notify } from "../../App";
import { sendEmail } from "../../EmailJs/emailJs";
import { getAllAvatars } from "../../ImageVariables";

export default function UserPage() {

    const [resetCode, setResetCode] = useState("");
    const [centredModal, setCentredModal] = useState(false);
    const [centredAvatarChangeModal, setCentredAvatarChangeModal] = useState(false);
    const [resetPasswordField, setResetPasswordField] = useState({
        email: "",
    });
    const [token, setToken] = useAtom(userToken);
    const [userDetails, setUserDetails] = useAtom(accountUsername);
    const [account, setAccount] = useAtom(accountDetails);
    const [avatar, setAvatar] = useAtom(accountAvatar);

    const passwordResetForm = useRef();

    const allAvatars = getAllAvatars();

    useEffect(() => {
        if (!token) {
            window.location.href = '/';
        } else {
            getData("users/get-user/" + userDetails, token)
                .then((response) => {
                    setAccount(response);
                });
        };
    }, []);

    const toggleShowCentredAvatarChangeModal = (e) => {
        e.preventDefault();
        setCentredAvatarChangeModal(!centredAvatarChangeModal);
    };

    const toggleShow = (e) => {
        e.preventDefault();
        setCentredModal(!centredModal);
    };

    const hanldePasswordChange = (e) => {
        e.persist();
        setResetPasswordField({ email: e.target.value });
    };

    const resetPassword = (e) => {
        e.preventDefault();
        if (resetPasswordField.email === "") {
            notify("warn", "All fields required!")
            return;
        };
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

    const changeAvatar = (e) => {
        putData("users/change-avatar", {
            avatar: e.target.id,
            username: account.username,
        }, token)
            .then((response) => {
                account.avatar = e.target.id;
                setAvatar(e.target.id);
                notify("success", response);
                toggleShowCentredAvatarChangeModal(e);
            });
    };

    return (
        <>
            {account &&
                (
                    <> <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
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

                        <MDBModal tabIndex='-1' show={centredAvatarChangeModal} setShow={setCentredAvatarChangeModal}>
                            <MDBModalDialog centered>
                                <MDBModalContent>
                                    <MDBModalHeader>
                                        <MDBModalTitle>Avatars</MDBModalTitle>
                                        <MDBBtn className='btn-close' color='none' onClick={toggleShowCentredAvatarChangeModal}></MDBBtn>
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        {centredAvatarChangeModal === true
                                            && (
                                                allAvatars.map((av, key) => {
                                                    return (
                                                        <img id={"con" + (key + 1)} onClick={(e) => { changeAvatar(e) }} key={key} className="avatar-img-picker" src={av} alt="ceva" />
                                                    )
                                                }))
                                        }
                                    </MDBModalBody>
                                </MDBModalContent>
                            </MDBModalDialog>
                        </MDBModal>

                        <MDBContainer className="user-page-container">
                            <div id="border">
                                <MDBCard id="border-background" className="user-settings" alignment='center'>
                                    <MDBCardHeader>
                                        <Avatar avatar={account.avatar} />
                                        <MDBBtn onClick={(e) => { toggleShowCentredAvatarChangeModal(e) }} className="fields" color="secondary"> Change Avatar </MDBBtn>
                                    </MDBCardHeader>
                                    <MDBCardBody>
                                        <MDBRow className="fields">
                                            <MDBCol>Username: </MDBCol>
                                            <MDBCol>{account.username}</MDBCol>
                                        </MDBRow>
                                        <MDBRow className="fields">
                                            <MDBCol>Created at: </MDBCol>
                                            <MDBCol>{account.submissionTime}</MDBCol>
                                        </MDBRow>
                                        <MDBRow className="fields">
                                            <MDBCol>Email: </MDBCol>
                                            <MDBCol>
                                                {account.email}
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow className="fields">
                                            <MDBCol>Password: </MDBCol>
                                            <MDBCol>
                                                <MDBBtn style={{ whiteSpace: 'nowrap' }} onClick={(e) => { toggleShow(e) }} color="secondary"> Forgot Password? </MDBBtn>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                    <MDBCardFooter>
                                        <MDBBtn size="lg" color="danger"> Delete Account! </MDBBtn>
                                    </MDBCardFooter>
                                </MDBCard>
                            </div>
                        </MDBContainer>
                    </>
                )
            }
        </>
    );
};