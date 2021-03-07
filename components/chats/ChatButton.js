import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Star from "./Star";


const ChatButtonContainerStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  background-color: #2d2d2d;
  min-height: 15%;
  width: available;
  border: 1px solid white;
`;

const ChatButtonStyled = styled.button`
  all: unset;
  font: 20px "ObjectSans";
  color: white;
  text-align: center;
  height: 100%;
  background-color: ${(props => props.isActive ? "#383838" : "inherit")};

  :hover {
    background-color: #383838;
    opacity: 100%;
    cursor: pointer;
  }
`;

export default class ChatButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <ChatButtonContainerStyled>
                <ChatButtonStyled onClick={this.handleClick} isActive={this.props.isActive}>
                    {this.props.name}
                </ChatButtonStyled>
                <Star/>
            </ChatButtonContainerStyled>
        )
    }

    handleClick() {
        this.props.handleClick(this.props.id);
    }
}

ChatButton.propTypes = {
    name: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    key: PropTypes.number,
    id: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
}

ChatButton.defaultProps = {
    isActive: false
}
