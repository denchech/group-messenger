import styled from 'styled-components'
import PropTypes from 'prop-types'

const AuthFormStyled = styled.form`
  background-color: #1f1b24;
  color: white;
  padding: 50px;
  border-radius: 5px;
`

export const LoginButtonStyled = styled.input.attrs({ type: 'submit' })`
  width: 30%;
  border-radius: 5px;
  color: black;
  background-color: white;
  outline: none;
  cursor: pointer;
  text-align: center;
  padding: 10px;
  margin-top: 20px;

  font-weight: bold;
`

export const DisableLinkStyled = styled.a`
  text-decoration: none;
  color: gray;
  
  :hover {
    text-decoration: underline;
  }
`

export default function AuthForm (props) {
  return (
    <AuthFormStyled onSubmit={props.handleSubmitButton}>
      {props.children}
    </AuthFormStyled>
  )
}

AuthForm.propTypes = {
  handleSubmitButton: PropTypes.func.isRequired
}
