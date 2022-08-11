import { useEffect } from "react";
import { userToken } from '../../Jotai/Atom';
import { useAtom } from 'jotai';

export default function UserPage() {

    const [token, setToken] = useAtom(userToken);

    useEffect(() => {
        if (!token) {
            window.location.href = '/';
        };
    }, []);

    return (
        <>
            ceva
        </>
    );
};