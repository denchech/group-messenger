import React from 'react'
import styled from "styled-components";
import Image from 'next/image';
import PropTypes from 'prop-types';
import {SidebarWidth} from './constants';

const SidebarButtonStyled = styled.div`
  border: 1px solid white;
  width: ${SidebarWidth};
  height: ${SidebarWidth};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.isActive ? "gray" : "inherit"};
  margin-top: ${props => props.isLast ? "auto" : "0"};

  :hover {
    background-color: gray;
    cursor: pointer;
  }
;
`

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isActive: props.isActive};
    }

    render() {
        return (
            <SidebarButtonStyled isActive={this.state.isActive} isLast={this.props.isLast}>
                <Image src={this.props.image} width={"25px"} height={"25px"}/>
            </SidebarButtonStyled>
        )
    }
}

Button.propTypes = {
    isActive: PropTypes.bool,
    isLast: PropTypes.bool,
    image: PropTypes.string.isRequired
}

Button.defaultProps = {
    isActive: false,
    isLast: false
}
