import React, { useState } from 'react'
import { useHistory } from 'react-router'
import Page from '../common/Page'
import { ButtonStyled, FormStyled } from '../common/StyledElements'
import TextInput from '../common/TextInput'
import { signIn } from '../utils/services'
import { setToStorage } from '../utils/storage'
import Alert from '../common/Alert'

export default function SignInPage() {
  const [alert, setAlert] = useState('')
  let history = useHistory()

  return (
    <Page title="ping ponguin">
      <FormStyled onSubmit={handleSignIn}>
        <TextInput name="email" labelName="E-Mail-Adresse" />
        <TextInput name="password" labelName="Passwort" type="password" />
        {alert && <Alert>{alert}</Alert>}
        <ButtonStyled>Sign in</ButtonStyled>
      </FormStyled>
    </Page>
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
