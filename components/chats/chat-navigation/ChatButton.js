import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Star from "./Star";


const ChatButtonContainerStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  background-color: ${(props => props.isActive ? "#414141" : "#2d2d2d")};
  min-height: 15%;
  width: available;
  border: 1px solid white;

  transition: background-color 500ms;


  :hover {
    background-color: #242424;
    cursor: pointer;
  }
`;

const ChatButtonStyled = styled.button`
  all: unset;
  font: 20px "ObjectSans";
  color: white;
  text-align: center;
  height: 100%;
`;

export default class ChatButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    }

    render() {
        return (
            <ChatButtonContainerStyled isActive={this.props.isActive}>
                <ChatButtonStyled onClick={this.handleClick}>
                    {this.props.name}
                </ChatButtonStyled>
                <Star isActive={this.props.isFavorite} handleClick={this.handleFavoriteClick}/>
            </ChatButtonContainerStyled>
        )
    }

    handleClick() {
        this.props.handleClick(this.props.id);
    }

    handleFavoriteClick() {
        this.props.handleFavoriteClick(this.props.id);
    }
}

ChatButton.propTypes = {
    name: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    isFavorite: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    handleFavoriteClick: PropTypes.func.isRequired
}

ChatButton.defaultProps = {
    isActive: false
}
