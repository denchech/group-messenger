import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export const InputStyled = styled.input`
  background-color: white;
  color: black;
  width: 100%;
  height: 35px;
  border-radius: 5px;
  border-color: transparent;
  text-align: left;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: gray;
  }
`;

const ErrorStyled = styled.label`
  color: #e20202;
`;

export default function AuthInput(props) {
    return (
        <>
            {renderError(props.id, props.error)}
            <InputStyled
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                value={props.state}
                onChange={handleInputChange(props.hook)}
            />
        </>
    );

    function handleInputChange(hook) {
        return function (e) {
            e.preventDefault();
            hook(e.target.value);
        };
    }

    function renderError(inputId, message) {
        if (message) {
            return (<ErrorStyled for={inputId}>{message}</ErrorStyled>);
        }
    }
}

AuthInput.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    hook: PropTypes.func.isRequired,
    error: PropTypes.string
}