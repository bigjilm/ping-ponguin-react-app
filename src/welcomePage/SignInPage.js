import React, { useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import Alert from '../common/Alert'
import { ButtonStyled, FormStyled } from '../common/StyledElements'
import TextInput from '../common/TextInput'
import { signIn } from '../utils/services'
import { setToStorage } from '../utils/storage'
import ppLogo from '../assets/pp-logo.png'

export default function SignInPage() {
  const [alert, setAlert] = useState('')
  let history = useHistory()

  return (
    <SignInPageStyled title="ping ponguin">
      <HeadlineStyled>ping ponguin</HeadlineStyled>
      <LogoStyled src={ppLogo} />
      <FormStyled onSubmit={handleSignIn}>
        <TextInput
          name="email"
          labelName="E-Mail-Adresse"
          placeholder="Gib hier deine E-Mail-Adresse ein"
        />
        <TextInput
          name="password"
          labelName="Passwort"
          placeholder="Gib hier ein Passwort ein"
          type="password"
        />
        {alert && <Alert>{alert}</Alert>}
        <ButtonStyled>Sign in</ButtonStyled>
      </FormStyled>
    </SignInPageStyled>
  )

  function handleSignIn(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    signIn(data)
      .then(res => {
        if (!res.success) {
          throw new Error(res.message)
        }
        setToStorage('pingu', res.token)
        form.reset()
        history.push('/users')
      })
      .catch(err => {
        if (err.message === 'Error: email must not be blank') {
          setAlert('Bitte gib deine E-Mail-Adresse ein')
        } else if (err.message === 'Error: password must not be blank') {
          setAlert('Bitte gib dein Passwort ein')
        } else if (err.message === 'Error: invalid email') {
          setAlert('Zu dieser E-Mail-Adresse existiert kein Konto')
        } else if (err.message === 'Error: wrong password') {
          setAlert('Das Passwort ist falsch')
        }
      })
  }
}

const SignInPageStyled = styled.main`
  display: grid;
  grid-auto-rows: min-content;
  justify-items: center;
  grid-gap: 50px;
  background-color: #418ab3;
  overflow: auto;
  padding: 80px;
  color: #c2d4d8;
`

const HeadlineStyled = styled.h1`
  margin: 0;
`

const LogoStyled = styled.img`
  height: 100px;
`
