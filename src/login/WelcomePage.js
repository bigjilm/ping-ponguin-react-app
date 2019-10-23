import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import ppLogo from '../assets/pp-logo.png'
import { ButtonStyled, LoadingMessageStyled } from '../common/StyledElements'
import { getFromStorage } from '../utils/storage'

export default function WelcomePage({ token }) {
  const [isLoading, setIsLoading] = useState(true)
  let history = useHistory()

  useEffect(() => {
    const token = getFromStorage('pingu-session')
    if (token) {
      history.push('/users')
    } else {
      setIsLoading(false)
    }
  }, [token, history])

  return (
    <WelcomePageStyled>
      <HeadlineStyled>ping ponguin</HeadlineStyled>
      <LogoStyled src={ppLogo} />
      {isLoading && <LoadingMessageStyled>Loading...</LoadingMessageStyled>}
      {isLoading || (
        <WelcomeButtonsStyled>
          <ButtonStyled onClick={handleSignInClick}>Einloggen</ButtonStyled>
          <ButtonStyled onClick={handleSignUpClick}>Registrieren</ButtonStyled>
        </WelcomeButtonsStyled>
      )}
    </WelcomePageStyled>
  )

  function handleSignInClick() {
    history.push('/signin')
  }

  function handleSignUpClick() {
    history.push('/signup')
  }
}

const WelcomePageStyled = styled.main`
  display: grid;
  grid-auto-rows: min-content;
  justify-items: center;
  grid-gap: 50px;
  background-color: var(--skyBlue);
  overflow: auto;
  padding: 80px;
  color: var(--iceBlue);
  height: 100%;
`

const HeadlineStyled = styled.h1`
  margin: 0;
  font-family: 'MetroBlack LT Two', Helvetica, sans-serif;
`

const WelcomeButtonsStyled = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  justify-items: center;
  grid-gap: 30px;
`

const LogoStyled = styled.img`
  height: 100px;
`
