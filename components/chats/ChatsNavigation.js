import React from "react";
import styled from "styled-components";
import ChatButton from "./ChatButton";


const ChatsStyled = styled.div`
  background-color: #121212;
  opacity: 90%;
  max-height: 100vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  
  ::-webkit-scrollbar {
    display: none;
  }
`

export default class ChatsNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.chatsCount = 10; // TODO: remove this

        this.state = {
            chats: []
        };

        this.handleChatButtonClick = this.handleChatButtonClick.bind(this);
    }

    render() {
        return (
            <ChatsStyled>
                {this.renderChats()}
            </ChatsStyled>
        );
    }

    componentDidMount() {
        this.setState({chats: this.getChats()})
    }

    // TODO: replace on api call
    getChats() {
        const chats = [];

        for (let i = 0; i < this.chatsCount; ++i) {
            chats.push({id: i, name: "Chat large super number" + i})
        }

        return chats;
    }

    renderChats() {
        const {chats, activeChatId} = this.state;
        return chats.map((chat) => (
            <ChatButton key={chat.id}
                        id={chat.id}
                        isActive={chat.id === activeChatId}
                        handleClick={this.handleChatButtonClick}
                        name={chat.name}
            />
        ));
    }

    handleChatButtonClick(chatId) {
        this.setState({activeChatId: chatId});
    }
}
