import Head from 'next/head'
import Sidebar from '../components/chats/Sidebar'
import ChatsNavigation from '../components/chats/ChatsNavigation'
import Layout from "../components/Layout";
import styled from "styled-components";

const ChatsStyled = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 2fr;
`

export default function Chats() {
    return (
        <Layout>
            <Head>
                <title>Chats</title>
                <link rel="icon" href="/messenger.ico"/>
            </Head>

            <ChatsStyled>
                <Sidebar key={"sidebar"}/>
                <ChatsNavigation key={"chatsNavigation"}/>
            </ChatsStyled>
        </Layout>
    )
}
