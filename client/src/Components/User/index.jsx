import { useEffect } from "react";
import { accountUsername, userToken, accountDetails, accountAvatar } from '../../Jotai/Atom';
import { useAtom } from 'jotai';
import { deleteData, getData, putData } from "../../Fetcher/fetcher";
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
import { RESET } from 'jotai/utils'


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
    const [centredModalDeleteAccount, setCentredModalDeleteAccount] = useState(false);

    const passwordResetForm = useRef();

    const allAvatars = getAllAvatars();

    useEffect(() => {
        if (!token) {
            window.location.href = '/';
        } else {
            getData("users/get-user/" + userDetails, token)
                .then((response) => {
                    setAccount(response);
                    setAvatar(response.avatar);
                });
        };
    }, []);

    const toggleShowCentredModalDeleteAccount = (e) => {
        e.preventDefault();
        setCentredModalDeleteAccount(!centredModalDeleteAccount);
    };

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

    const deleteAccount = () => {
        deleteData("users/delete-account/" + account.username, token)
            .then((response) => {
                window.location.href = "/";
                setToken(RESET);
                setUserDetails(RESET);
                setAccount(RESET);
                setAvatar(RESET);
                notify("success", response);
            });
    };

    return (
        <>
            {account &&
                (
                    <>
                        <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
                            <MDBModalDialog centered>
                                <div id="border">
                                    <MDBModalContent id="border-background" >
                                        <MDBModalHeader >
                                            <MDBModalTitle>Forget Password</MDBModalTitle>
                                            <MDBBtn className='btn-close' color='secondary' onClick={toggleShow}></MDBBtn>
                                        </MDBModalHeader>
                                        <MDBModalBody style={{ textAlign: 'center' }}>
                                            <p>Enter here your email address to reset your password!</p>
                                            <form ref={passwordResetForm} onSubmit={(e) => { resetPassword(e) }} >
                                                <MDBInputGroup className='mb-3' noBorder textBefore={<MDBIcon fas icon='envelope' />}>
                                                    <MDBInput style={{ display: 'none' }} value={resetCode} name='resetCode' label="Email" className='form-control' type='password' />
                                                    <MDBInput style={{ backgroundColor: 'white' }} name='email' onChange={hanldePasswordChange} label="Email" className='form-control' type='email' />
                                                    <MDBBtn color='secondary' type='submit'> Submit </MDBBtn>
                                                </MDBInputGroup>
                                            </form>
                                        </MDBModalBody>
                                    </MDBModalContent>
                                </div>
                            </MDBModalDialog>
                        </MDBModal>

                        <MDBModal tabIndex='-1' show={centredAvatarChangeModal} setShow={setCentredAvatarChangeModal}>
                            <MDBModalDialog centered>
                                <div id="border">
                                    <MDBModalContent id="border-background">
                                        <MDBModalHeader>
                                            <MDBModalTitle>Avatars</MDBModalTitle>
                                            <MDBBtn className='btn-close' color='secondary' onClick={toggleShowCentredAvatarChangeModal}></MDBBtn>
                                        </MDBModalHeader>
                                        <MDBModalBody className="avatar-position">
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
                                </div>
                            </MDBModalDialog>
                        </MDBModal>

                        <MDBModal staticBackdrop tabIndex='-1' show={centredModalDeleteAccount} setShow={setCentredModalDeleteAccount}>
                            <MDBModalDialog centered>
                                <div id="border">
                                    <MDBModalContent style={{ padding: '5%' }} id="border-background">
                                        <MDBModalHeader>
                                            <MDBModalTitle>Hold on!</MDBModalTitle>
                                        </MDBModalHeader>
                                        <MDBModalBody style={{ textAlign: 'center' }}>
                                            <h5>
                                                You are about to delete this account
                                            </h5>
                                            <h3>FOREVER!</h3>
                                            <h5>Are you sure ?</h5>
                                        </MDBModalBody>
                                        <MDBCardFooter >
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "space-between"
                                            }}>
                                                <MDBBtn onClick={(e) => {
                                                    notify("", "😶‍🌫️Smart decision!");
                                                    toggleShowCentredModalDeleteAccount(e);
                                                }} size="lg" color="secondary">No</MDBBtn>
                                                <MDBBtn onClick={deleteAccount} size="lg" color="danger">Yes</MDBBtn>
                                            </div>
                                        </MDBCardFooter>
                                    </MDBModalContent>
                                </div>
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
                                        <MDBBtn onClick={toggleShowCentredModalDeleteAccount} size="lg" color="danger"> Delete Account! </MDBBtn>
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