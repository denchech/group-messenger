import React from "react"
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "./Button";
import {SidebarWidth} from "../constants";

const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1f1b24;
  min-height: 100vh;
  width: ${SidebarWidth};
`

export default class Sidebar extends React.Component {
    render() {
        return (
            <SidebarStyled>
                <Button image={"/person.ico"}/>
                <Button image={"/star.ico"} isActive={this.props.isFavorite} handleClick={this.props.handleButtonClick}/>
                <Button image={"/group_add.ico"}/>
                <Button image={"/logout.ico"} isLast={true} handleClick={this.logout}/>
            </SidebarStyled>
        )
    }

    logout() {
        if (process.browser) {
            window.location.href = '/logout';
        }
    }
}

Sidebar.propTypes = {
    isFavorite: PropTypes.bool.isRequired,
    handleButtonClick: PropTypes.func.isRequired
};
