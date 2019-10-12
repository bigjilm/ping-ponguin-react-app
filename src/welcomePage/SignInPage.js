import React, { useState } from 'react'
import { useHistory } from 'react-router'
import Page from '../common/Page'
import { ButtonStyled, FormStyled } from '../common/StyledElements'
import TextInput from '../common/TextInput'
import { signIn } from '../utils/services'
import { setToStorage } from '../utils/storage'

export default function SignInPage() {
  const [missingInputs, setMissingInputs] = useState([])
  let history = useHistory()

  return (
    <Page title="ping ponguin">
      <FormStyled onSubmit={handleSignIn}>
        <TextInput
          name="email"
          labelName="E-Mail-Adresse"
          missingInputs={missingInputs}
        />
        <TextInput
          name="password"
          labelName="Passwort"
          type="password"
          missingInputs={missingInputs}
        />
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
        // console.log(res)
        //   form.reset()
        //   history.push('/users')
      })
      .catch(err => {
        console.log(err)
        if (err.message === 'Error: email must not be blank') {
          setMissingInputs(['email'])
        } else if (err.message === 'Error: password must not be blank') {
          setMissingInputs(['password'])
        }
      })
  }
}
