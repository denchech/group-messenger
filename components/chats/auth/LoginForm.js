import client from "../../../libs/client";
import Router from "next/router";
import AuthForm, {DisableLinkStyled, LoginButtonStyled} from "./AuthForm";
import React, {useState} from "react";
import Link from "next/link";
import AuthInput from "./AuthInput";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({username: null, password: null});

    return (
        <AuthForm handleSubmitButton={handleSubmitButton}>
            <h2>Log in <Link href="/register" passHref><DisableLinkStyled>Register</DisableLinkStyled></Link></h2>
            <AuthInput id={"username"} type={"text"} placeholder={"Username"} state={username} hook={setUsername} error={error.username}/>
            <AuthInput id={"password"} type={"password"} placeholder={"Password"} state={password} hook={setPassword} error={error.password}/>
            <LoginButtonStyled value="Submit"/>
        </AuthForm>
    );

    function handleSubmitButton(username, password) {
        e.preventDefault();
        client.post("/api/session", {username: username, password: password})
            .then(
                () => {
                    Router.push('/');
                }
            )
            .catch(error => {
                setError({[error.response.data.path ?? 'username']: error.response.data.error});
            });
    }
}