import React from "react"
import styled from "styled-components";
import Button from "./Button";
import {SidebarWidth} from "./constants";

const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1f1b24;
  padding-top: ${SidebarWidth};
  min-height: calc(100vh - ${SidebarWidth});
  width: auto;
`

export default class Sidebar extends React.Component {
    render() {
        return (
            <SidebarStyled>
                <Button image={"/person.ico"}/>
                <Button image={"/star.ico"}/>
                <Button image={"/groups.ico"}/>
                <Button image={"/logout.ico"} isLast={true}/>
            </SidebarStyled>
        )
    }
}


