import React, {useState} from "react";
import Head from 'next/head'
import Layout from "../components/Layout";
import styled from "styled-components";
import Sidebar from "../components/chats/sidebar/Sidebar";
import ChatsNavigation from "../components/chats/chat-navigation/ChatsNavigation";
import Chat from "../components/chats/chat/Chat";
import EmptyChat from "../components/chats/chat/EmptyChat";
import nookies from "nookies";

const ChatPageStyled = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 2fr;
`;


export default function Chats(props) {
    const [activeChatId, setActiveChatId] = useState(null);
    const [showFavorite, setShowFavorite] = useState(false);

    return (
        <Layout>
            <Head>
                <title>Chats</title>
                <link rel="icon" href="/messenger.ico"/>
            </Head>
            <ChatPageStyled>
                <Sidebar isFavorite={showFavorite} handleButtonClick={handleFavoriteButtonClick}/>
                <ChatsNavigation showFavorite={showFavorite} activeChatId={activeChatId}
                                 handleChatButtonClick={handleChatButtonClick}/>
                {renderChat()}
            </ChatPageStyled>
        </Layout>
    );

    function renderChat() {
        return activeChatId ? <Chat token={props.token} chatId={activeChatId}/> : <EmptyChat/>;
    }

    function handleChatButtonClick(chatId) {
        setActiveChatId(chatId === activeChatId ? null : chatId);
    }

    function handleFavoriteButtonClick() {
        setShowFavorite(!showFavorite);
    }
}
