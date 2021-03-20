import React from "react";
import styled from "styled-components";
import {ChatBackgroundStyled} from "./Chat";

const EmptyChatStyled = styled(ChatBackgroundStyled)`
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
`;

export default function EmptyChat() {
    return (
        <EmptyChatStyled>
            Choose a chat and start messaging
        </EmptyChatStyled>
    );
}