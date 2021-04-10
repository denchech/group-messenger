import Layout from "../components/Layout";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import client from "../libs/client";
import Router from "next/router";


const LoginPageStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: gray;
`;



export default class Login extends React.Component {

    componentDidMount() {
        this.getUser().then((response) => {
            if (response.data.user) {
                Router.push('/');
            }
        });
    }

    async getUser() {
        return await client.get('/api/users');
    }

    render() {
        return (
            <Layout>
                <Head>
                    <title>Login</title>
                    <link rel="icon" href="/messenger.ico"/>
                </Head>
                <LoginPageStyled>
                    <LoginForm/>
                </LoginPageStyled>

            </Layout>
        );
    }
}
