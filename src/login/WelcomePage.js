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
    const token = getFromStorage('pingu')
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
          <ButtonStyled onClick={handleSignInClick}>Sign in</ButtonStyled>
          <ButtonStyled onClick={handleSignUpClick}>Sign up</ButtonStyled>
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
  background-color: #418ab3;
  overflow: auto;
  padding: 80px;
  color: #c2d4d8;
  height: 100%;
`

const HeadlineStyled = styled.h1`
  margin: 0;
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
