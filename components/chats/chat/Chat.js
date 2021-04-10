import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ChatForm from "./ChatForm";
import Message from "./Message";
import client from "../../../libs/client";

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
    chatContainerRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            isLoaded: false
        };

        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.renderMessages = this.renderMessages.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.renderChatContainer = this.renderChatContainer.bind(this);
    }

    render() {
        return (
            <ChatContainerStyled>
                <ChatStyled>
                    <div ref={this.chatContainerRef}/>
                    {this.renderMessages()}
                </ChatStyled>
                <ChatForm handleSubmit={this.handleSendMessage}/>
            </ChatContainerStyled>
        )
    }

    componentDidMount() {
        this.renderChatContainer()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.chatId !== this.props.chatId) {
            this.renderChatContainer();
        }
    }

    renderChatContainer() {
        this.getMessages();
        this.chatContainerRef?.current.scrollIntoView();
        console.log(!!this.chatContainerRef);
    }

    renderMessages() {
        const {messages, isLoaded} = this.state;

        if (isLoaded) {
            return messages.map((message) => (
                    <Message key={message.id} text={message.text} isMine={message.isMine} name={message.author.name}/>
                )
            );
        }
    }

    handleSendMessage(messageText) {
        const {messages} = this.state;

        client.all([
            client.post('/api/chats/' + this.props.chatId + '/messages', {text: messageText}),
            client.get('/api/users'),
        ])
            .then(client.spread((messageResponse, userResponse) => {
                return [messageResponse.data, userResponse.data];
            }))
            .then(
                client.spread((message, user) => {
                    message.isMine = message.author.id === user.id;
                    messages.unshift(message)

                    this.setState({messages: messages});
                })
            )
            .catch((error) => {
                console.log(error);
            });
    }

    getMessages() {
        client.all([
            client.get('/api/chats/' + this.props.chatId + '/messages'),
            client.get('/api/users'),
        ])
            .then(client.spread((messageResponse, userResponse) => {
                return [messageResponse.data, userResponse.data];
            }))
            .then(
                client.spread((messages, user) => {

                    this.setState({
                        isLoaded: true,
                        messages: messages.map((message) => {
                            message.isMine = message.author.id === user.id;

                            return message;
                        })
                    });
                })
            )
            .catch((error) => {
                console.log(error);
            })
        ;
    }

}

Chat.propTypes = {
    chatId: PropTypes.string.isRequired
};
