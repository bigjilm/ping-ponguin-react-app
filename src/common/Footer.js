import React from 'react'
import styled from 'styled-components/macro'
import homeIcon from '../assets/home-icon.svg'
import profileIcon from '../assets/profile-icon.svg'

export default function Footer() {
  return (
    <FooterStyled>
      <IconStyled src={homeIcon} />
      <IconStyled src={profileIcon} />
    </FooterStyled>
  )
}

const FooterStyled = styled.nav`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
  background-color: #c2d4d8;
  border-top: 2px solid #418ab3;
`

const IconStyled = styled.img`
  height: 30px;
`
