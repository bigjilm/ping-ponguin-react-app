import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import TextInput from '../common/TextInput'
import { getUserSession, logout, signIn } from '../utils/services'
import { getFromStorage, setToStorage } from '../utils/storage'

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
    <Page title="ping ponguin">
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

      <button onClick={handleSignUpClick}>Sign up</button>

      <button onClick={handleLogout}>Logout</button>
    </Page>
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

  function handleSignUpClick() {
    history.push('/signup')
  }

  function handleLogout() {
    const token = getFromStorage('pingu')
    if (token) {
      setToStorage('pingu', null)
      logout(token).then(res => console.log(res.message))
    }
  }
}
