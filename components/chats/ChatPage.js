import React, {useState, useMemo} from "react";
import styled from "styled-components";
import Sidebar from './sidebar/Sidebar';
import ChatsNavigation from './chat-navigation/ChatsNavigation';
import Chat from "./chat/Chat";
import EmptyChat from "./chat/EmptyChat";

const ChatPageStyled = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 2fr;
`;


export default function ChatPage() {
    const [activeChatId, setActiveChatId] = useState(null);
    const [showFavorite, setShowFavorite] = useState(false);

    // TODO: remove this later
    const messagesCount = 10;


    /** @deprecated should be refactored to useEffect() with previous activeChatId */
    const messages = useMemo(getMessages, [activeChatId]);

    // let messages = getMessages();
    // useEffect(() => {
    //     messages = getMessages();
    // });

    return (
        <ChatPageStyled>
            <Sidebar isFavorite={showFavorite} handleButtonClick={handleFavoriteButtonClick}/>
            <ChatsNavigation showFavorite={showFavorite} activeChatId={activeChatId} handleChatButtonClick={handleChatButtonClick}/>
            {renderChat()}
        </ChatPageStyled>
    );

    function renderChat() {
        return activeChatId ? <Chat messages={messages}/> : <EmptyChat/>;
    }

    function handleChatButtonClick(chatId) {
        setActiveChatId(chatId === activeChatId ? null : chatId);
    }

    function handleFavoriteButtonClick() {
        setShowFavorite(!showFavorite);
    }

    // TODO: change on api call
    function getMessages() {
        const messages = [];
        const longText = "Sometimes it's absolutely complicated to make this fucking React working properly\nI wanna die rn!"


        let isMine, text, userNumber, name;
        for (let i = 0; i < messagesCount; ++i) {
            isMine = Math.random() < 0.5;
            text = activeChatId + "\nMessage" + i + "\n" + longText;
            userNumber =  isMine ? "0" : Math.floor(Math.random() * 10 + 1);
            name = "user" + userNumber;
            messages.push({id: i,text: text, isMine: isMine, createdBy: {name: name}});
        }

        return messages;
    }
}