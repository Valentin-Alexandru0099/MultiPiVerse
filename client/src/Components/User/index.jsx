import { useEffect } from "react";
import { accountUsername, userToken } from '../../Jotai/Atom';
import { useAtom } from 'jotai';
import { getData } from "../../Fetcher/fetcher";

export default function UserPage() {

    const [token, setToken] = useAtom(userToken);
    const [userDetails, setUserDetails] = useAtom(accountUsername);

    useEffect(() => {
        if (!token) {
            window.location.href = '/';
        } else {
            getData("users/get-user/" + userDetails, token)
                .then((response) => {
                    console.log(response);
                    // setUserDetails(response);
                });
        };
    }, []);



    return (
        <>
            ceva
        </>
    );
};