import React from 'react'
import styled from "styled-components";
import Image from 'next/image';
import PropTypes from 'prop-types';
import {SidebarWidth} from './constants';

export const SidebarButtonStyled = styled.button`
  all: unset;
  border: 1px solid white;
  height: ${SidebarWidth};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.isActive ? "gray" : "inherit"};
  margin-top: ${props => props.isLast ? "auto" : "0"};
  transition: background-color 500ms;

  :hover {
    background-color: gray;
    cursor: pointer;
  }
;
`

export default class Button extends React.Component {
    render() {
        return (
            <SidebarButtonStyled onClick={this.props.handleClick} isActive={this.props.isActive} isLast={this.props.isLast}>
                <Image src={this.props.image} width={"25px"} height={"25px"}/>
            </SidebarButtonStyled>
        )
    }
}

Button.propTypes = {
    isActive: PropTypes.bool,
    isLast: PropTypes.bool,
    image: PropTypes.string.isRequired,
    handleClick: PropTypes.func
}

Button.defaultProps = {
    isActive: false,
    isLast: false
}
