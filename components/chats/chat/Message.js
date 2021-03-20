import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const UsernameStyled = styled.span`
  color: black;
  font-weight: bold;
`;

const MessageStyled = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  align-self: ${(props => props.isMine ? "flex-end" : "flex-start")};
  background-color: darkcyan;
  height: auto;
  color: white;
  max-width: 40%;
  padding: 10px;
  margin-top: 10px;
  width: fit-content;
  word-wrap: break-word;
  white-space: pre-line;
`;

MessageStyled.propTypes = {
    isMine: PropTypes.bool.isRequired
}

export default class Message extends React.Component {
    constructor(props) {
        super(props);

        this.renderUsername = this.renderUsername.bind(this);
    }

    render() {
        return (
            <MessageStyled isMine={this.props.isMine}>
                {this.renderUsername()}
                {this.props.text}
            </MessageStyled>
        );
    }

    renderUsername() {
        const {isMine, name} = this.props;
        if (!isMine) {
            return (
                <UsernameStyled>
                    {name}
                </UsernameStyled>
            )
        }
    }
}

Message.propTypes = {
    text: PropTypes.string.isRequired,
    isMine: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
}
