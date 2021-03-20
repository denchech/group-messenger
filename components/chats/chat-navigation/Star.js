import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StarStyled = styled.svg`
  fill: ${(props => props.isActive ? "white" : "black")};
  transition: fill 500ms;

  :hover {
    fill: white;
    cursor: pointer;
  }
`;

StarStyled.propTypes = {
    isActive: PropTypes.bool.isRequired
}

export default class Star extends React.Component {
    constructor(props) {
        super(props);

        this.state = {isActive: props.isActive};
    }

    render() {
        return (
            <StarStyled isActive={this.props.isActive} onClick={this.props.handleClick}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24" fill="black"
                        width="36px" height="36px">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </StarStyled>
        );
    }
}

Star.propTypes = {
    isActive: PropTypes.bool,
    handleClick: PropTypes.func.isRequired
};

Star.defaultProps = {
    isActive: false
}
