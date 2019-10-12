import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router'
import { getFromStorage, setToStorage } from '../utils/storage'
import TextInput from '../common/TextInput'
import { signIn, signUp, getUserSession, logout } from '../utils/services'

export default function WelcomePage() {
  // add loading message
  const [isLoading, setIsLoading] = useState(true)
  let history = useHistory()

  useEffect(() => {
    const token = getFromStorage('pingu')
    if (token) {
      getUserSession(token).then(session => {
        console.log(session.message)
        if (session.success) {
          //   history.push('/users')
        } else {
          setIsLoading(false)
        }
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <WelcomePageStyled>
      {isLoading && <p>Loading...</p>}
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
      <button onClick={handleLogout}>Logout</button>
    </WelcomePageStyled>
  )

  function handleSignIn(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    signIn(data).then(res => {
      setToStorage('pingu', res.token)
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

  function handleLogout() {
    const token = getFromStorage('pingu')
    if (token) {
      setToStorage('pingu', null)
      logout(token).then(res => console.log(res.message))
    }
  }
}

const WelcomePageStyled = styled.main`
  display: grid;
`
