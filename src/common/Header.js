import React from 'react'
import styled from 'styled-components/macro'
import logo from '../assets/logo.png'

export default function Header() {
  return (
    <HeaderStyled>
      <LogoStyled src={logo} alt=""></LogoStyled>
      <TitleStyled>ping ponguin</TitleStyled>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  display: grid;
  grid-template-columns: 48px auto 48px;
  place-items: center;
  grid-gap: 5px;
  background-color: #c2d4d8;
  padding: 5px;
  border-bottom: 2px solid #418ab3;
`

const TitleStyled = styled.h1`
  margin: 0;
`

const LogoStyled = styled.img`
  height: 32px;
`
