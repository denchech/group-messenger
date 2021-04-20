import Login, { LoginPageStyled } from './login'
import Layout from '../components/Layout'
import Head from 'next/head'
import RegisterForm from '../components/chats/auth/RegisterForm'

export default class Register extends Login {
  render () {
    return (
      <Layout>
        <Head>
          <title>Register</title>
          <link rel='icon' href='/messenger.ico' />
        </Head>
        <LoginPageStyled>
          <RegisterForm />
        </LoginPageStyled>
      </Layout>
    )
  }
}
