import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ChatForm from "./ChatForm";
import Message from "./Message";

const ChatContainerStyled = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  max-height: 100vh;
`;

export const ChatBackgroundStyled = styled.div`
  background-color: #121212;
  opacity: 50%;;
`;

const ChatStyled = styled(ChatBackgroundStyled)`
  display: flex;
  flex-direction: column-reverse;
  background-color: #121212;
  opacity: 50%;
  padding: 10px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;


export default class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.handleSendMessage = this.handleSendMessage.bind(this);
    }

    render() {
        return (
            <ChatContainerStyled>
                <ChatStyled>
                    {this.renderMessages()}
                </ChatStyled>
                <ChatForm handleSubmit={this.handleSendMessage}/>
            </ChatContainerStyled>
        )
    }

    renderMessages() {
        const {messages} = this.props;

        return messages.map((message) => (
            <Message text={message.text} isMine={message.isMine} name={message.createdBy.name}/>
            )
        );
    }

    handleSendMessage(messageText) {
        const {messages} = this.props;

        // TODO: add API call
        const message = {id: messages.length + 1, text: messageText, isMine: true, createdBy: {name: "user0"}};
        messages.unshift(message)

        this.setState({messages: messages});
    }

}

Chat.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            isMine: PropTypes.bool.isRequired,
            createdBy: PropTypes.shape({
                name: PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired
};
