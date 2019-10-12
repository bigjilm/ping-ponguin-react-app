import React from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router'
import Page from '../common/Page'
import TextInput from '../common/TextInput'
import { signIn } from '../utils/services'
import { setToStorage } from '../utils/storage'
import { FormStyled, ButtonStyled } from '../common/StyledElements'

export default function SignInPage() {
  let history = useHistory()

  return (
    <Page title="ping ponguin">
      <FormStyled onSubmit={handleSignIn}>
        <TextInput name="email" labelName="Name" type="email" />
        <TextInput name="password" labelName="Passwort" type="password" />
        <ButtonStyled>Sign in</ButtonStyled>
      </FormStyled>
    </Page>
  )

  function handleSignIn(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    console.log(data)
    signIn(data).then(res => {
      setToStorage('pingu', res.token)
      form.reset()
      console.log(res)
      //   history.push('/users')
    })
  }
}
