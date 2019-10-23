import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import ppLogo from '../assets/pp-logo.png'
import Alert from '../common/Alert'
import { ButtonStyled, BackButtonStyled } from '../common/StyledElements'
import TextInput from '../common/TextInput'
import { signIn } from '../utils/services'
import { setToStorage } from '../utils/storage'

export default function SignInPage({
  setCurrentUser,
  justSignedUp,
  setJustSignedUp,
}) {
  const [alert, setAlert] = useState('')
  let history = useHistory()

  useEffect(() => {
    document.querySelector('input').focus()
    return () => setJustSignedUp(false)
  }, [setJustSignedUp])

  return (
    <SignInPageStyled title="ping ponguin">
      <HeadlineStyled>ping ponguin</HeadlineStyled>
      <LogoStyled src={ppLogo} />
      {justSignedUp && (
        <SignUpMessageStyled>
          Du kannst dich jetzt einloggen
        </SignUpMessageStyled>
      )}
      <SignInFormStyled onSubmit={handleSignIn}>
        <TextInput
          name="email"
          labelName="E-Mail-Adresse"
          placeholder="Gib hier deine E-Mail-Adresse ein"
        />
        <TextInput
          name="password"
          labelName="Passwort"
          placeholder="Gib hier dein Passwort ein"
          type="password"
        />
        {alert && <Alert>{alert}</Alert>}
        <ButtonStyled style={{ marginTop: '10px' }}>Einloggen</ButtonStyled>
      </SignInFormStyled>
      <BackButtonStyled
        onClick={() => {
          history.push('/')
        }}
      >
        zurück
      </BackButtonStyled>
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
        setToStorage('pingu-session', res.token)
        setCurrentUser(data)
        form.reset()
        history.push('/users')
      })
      .catch(err => {
        if (err.message === 'Email must not be blank') {
          setAlert('Bitte gib deine E-Mail-Adresse ein')
        } else if (err.message === 'Password must not be blank') {
          setAlert('Bitte gib dein Passwort ein')
        } else if (err.message === 'Invalid email') {
          setAlert('Zu dieser E-Mail-Adresse existiert kein Konto')
        } else if (err.message === 'Wrong password') {
          setAlert('Das Passwort ist falsch')
        } else {
          console.error(err)
        }
      })
  }
}

const SignInPageStyled = styled.main`
  display: grid;
  grid-auto-rows: min-content;
  justify-items: center;
  grid-gap: 20px;
  overflow: auto;
  height: 100%;
  padding: 80px;
  background-color: var(--skyBlue);
  color: var(--iceBlue);
`

const HeadlineStyled = styled.h1`
  margin: 0;
  font-family: 'MetroBlack LT Two', Helvetica, sans-serif;
`

const LogoStyled = styled.img`
  height: 100px;
`

const SignUpMessageStyled = styled.span`
  text-align: center;
  color: var(--iceBlue);
`

const SignInFormStyled = styled.form`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 30px;
  overflow: auto;
  padding: 0px 30px;
`
