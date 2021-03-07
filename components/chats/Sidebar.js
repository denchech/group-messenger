import React from "react"
import styled from "styled-components";
import Button from "./Button";
import {SidebarWidth} from "./constants";

const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1f1b24;
  min-height: 100vh;
  width: ${SidebarWidth};
`

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {isFavorite: false}

        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    render() {
        return (
            <SidebarStyled>
                <Button key={"profile"} image={"/person.ico"}/>
                <Button key={"favorite"} image={"/star.ico"} isActive={this.state.isFavorite} handleClick={this.handleButtonClick}/>
                <Button key={"group_add"} image={"/group_add.ico"}/>
                <Button key={"logout"} id={"logout"} image={"/logout.ico"} isLast={true}/>
            </SidebarStyled>
        )
    }

    handleButtonClick() {
        this.setState((state) => ({isFavorite: !state.isFavorite}));
    }
}
