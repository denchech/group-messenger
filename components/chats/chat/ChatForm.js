import React from "react";
import styled from "styled-components";
import Image from "next/image";
import PropTypes from "prop-types";

const ChatFormStyled = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  height: 50px;

  & input[type="submit"] {
    display: none;
  }
`;

const ChatInput = styled.textarea`
  all: unset;
  height: 100%;
`;

const ChatInputLabelStyled = styled.label`
  display: flex;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;

export default class ChatForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {message: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <ChatFormStyled onSubmit={this.handleSubmit}>
                <ChatInput value={this.state.message} onChange={this.handleChange}/>
                <ChatInputLabelStyled>
                    <input type="submit"/>
                    <Image src={"/send.ico"} width={"50px"} height={"50px"}/>
                </ChatInputLabelStyled>
            </ChatFormStyled>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.message)
        this.setState({message: ''});
    }

    handleChange(event) {
        this.setState({message: event.target.value});
    }
}

ChatForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}
