import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
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

        this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
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

        let isFavorite;
        let index;
        for (let i = 0; i < this.chatsCount; ++i) {
            isFavorite = Math.random() < 0.5;
            index = i;
            chats[index] = {id: i.toString(), name: "Chat number " + i, isFavorite: isFavorite};
        }

        return chats;
    }

    renderChats() {
        const {chats} = this.state;
        const {activeChatId, showFavorite} = this.props;

        const displayedChats = showFavorite ? chats.filter((chat) => chat.isFavorite || chat.id === activeChatId) : chats;

        return displayedChats.map((chat) => (
            <ChatButton key={chat.id}
                        id={chat.id}
                        isActive={chat.id === activeChatId}
                        handleClick={this.props.handleChatButtonClick}
                        name={chat.name}
                        isFavorite={chat.isFavorite}
                        handleFavoriteClick={this.handleFavoriteClick}
            />
        ));
    }

    handleFavoriteClick(chatId) {
        const {chats} = this.state;

        chats[chatId].isFavorite = !chats[chatId].isFavorite;

        this.setState({chats: chats});
    }
}

ChatsNavigation.propTypes = {
    handleChatButtonClick: PropTypes.func.isRequired,
    activeChatId: PropTypes.oneOf([
        null,
        PropTypes.string
    ]).isRequired,
    showFavorite: PropTypes.bool.isRequired
};
