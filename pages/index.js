import React from "react";
import Head from 'next/head'
import Layout from "../components/Layout";
import ChatPage from "../components/chats/ChatPage";

export default function Index() {
    return (
        <Layout>
            <Head>
                <title>Chats</title>
                <link rel="icon" href="/messenger.ico"/>
            </Head>
            <ChatPage/>
        </Layout>
    );
}
