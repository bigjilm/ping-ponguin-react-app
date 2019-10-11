import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { getFromStorage } from '../utils/storage'
import TextInput from '../common/TextInput'
import { getToken, postUser, signIn, signUp } from '../utils/services'

export default function WelcomePage() {
  // add loading message

  useEffect(() => {
    // const token = getFromStorage('pingu')
    // if (token) {
    // }
  }, [])

  return (
    <WelcomePageStyled>
      <form onSubmit={handleSignIn}>
        <label>
          Email
          <TextInput name="email" type="email" />
        </label>
        <label>
          Passwort
          <TextInput name="password" type="password" />
        </label>
        <button>Sign in</button>
      </form>
      <form onSubmit={handleSignUp}>
        <label>
          Name
          <TextInput name="name" type="text" />
        </label>
        <label>
          Email
          <TextInput name="email" type="email" />
        </label>
        <label>
          Passwort
          <TextInput name="password" type="password" />
        </label>
        <button>Sign up</button>
      </form>
    </WelcomePageStyled>
  )

  function handleSignIn(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    signIn(data).then(res => {
      form.reset()
      console.log(res)
    })
  }

  function handleSignUp(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    signUp(data).then(res => {
      form.reset()
      console.log(res)
    })
  }
}

const WelcomePageStyled = styled.main`
  display: grid;
`
