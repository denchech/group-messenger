import styled from "styled-components";
import {useState} from "react";
import client from "../libs/client";
import Router from "next/router";

const LoginFormStyled = styled.form`
  background-color: #1f1b24;
  color: white;
  padding: 50px;
  border-radius: 5px;
`;

const InputStyled = styled.input`
  background-color: white;
  color: black;
  width: 100%;
  height: 35px;
  border-radius: 5px;
  border-color: transparent;
  text-align: left;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: gray;
  }
`;

const LoginButtonStyled = styled.input.attrs({type: "submit"})`
  width: 30%;
  border-radius: 5px;
  color: black;
  background-color: white;
  outline: none;
  cursor: pointer;
  text-align: center;
  padding: 10px;
  margin-top: 20px;

  font-weight: bold;
`;

const ErrorStyled = styled.label`
  color: #e20202;
`;

export default function LoginForm(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({username: null, password: null});

    return (
        <LoginFormStyled onSubmit={handleSubmitButton}>
            <h2>Sign in</h2>
            {renderError("username", error.username)}
            <InputStyled id="username" type="text" placeholder="Username" value={username}
                         onChange={handleInputChange(setUsername)}/>
            {renderError("password", error.password)}
            <InputStyled id="password" type="password" placeholder="Password" value={password}
                         onChange={handleInputChange(setPassword)}/>
            <LoginButtonStyled value={"Log in"}/>
        </LoginFormStyled>
    );

    function renderError(inputId, message) {
        if (message) {
            return (<ErrorStyled for={inputId}>{message}</ErrorStyled>);
        }
    }

    function handleInputChange(hook) {
        return function (e) {
            e.preventDefault();
            hook(e.target.value);
        };
    }

    function handleSubmitButton(e) {
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