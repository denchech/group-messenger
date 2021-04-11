import Router from "next/router";
import client from "../libs/client";

export default function Logout(props) {
    if (process.browser) {
        client
            .delete('/api/session')
            .then(() => Router.push('/login'));
    }

    return null;
}