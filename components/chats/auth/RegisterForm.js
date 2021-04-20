import React, { useState } from 'react'
import AuthForm, { DisableLinkStyled, LoginButtonStyled } from './AuthForm'
import AuthInput from './AuthInput'
import client from '../../../libs/client'
import Router from 'next/router'
import Link from 'next/link'

export default function RegisterForm () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState({
    username: null,
    password: null,
    passwordConfirmation: null
  })

  return (
    <AuthForm name='Log in' handleSubmitButton={handleSubmitButton} error={error}>
      <h2>
        Register <Link href='/login' passHref><DisableLinkStyled>Login</DisableLinkStyled></Link>
      </h2>
      <AuthInput id='username' type='text' placeholder='Username' state={username} hook={setUsername} error={error.username} />
      <AuthInput id='password' type='password' placeholder='Password' state={password} hook={setPassword} error={error.password} />
      <AuthInput
        id='passwordConfirmation'
        type='password'
        placeholder='Password confirmation'
        state={passwordConfirmation}
        hook={setPasswordConfirmation}
        error={error.passwordConfirmation}
      />
      <LoginButtonStyled value='Submit' />
    </AuthForm>
  )

  function handleSubmitButton (e) {
    e.preventDefault()
    client.post('/api/users', { username: username, password: password, confirmPassword: passwordConfirmation })
      .then(
        () => {
          Router.push('/')
        }
      )
      .catch(error => {
        setError({ [error.response.data.path ?? 'username']: error.response.data.error })
      })
  }
}
