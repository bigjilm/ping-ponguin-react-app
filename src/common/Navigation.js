import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import iglooIcon from '../assets/igloo-icon.png'
import chatIcon from '../assets/chat-icon.svg'
import profileIcon from '../assets/profile-icon.svg'

export default function Navigation() {
  return (
    <NavigationStyled>
      <NavLinkStyled exact to="/users">
        <IconStyled src={iglooIcon} />
      </NavLinkStyled>
      <NavLinkStyled to="/chat">
        <IconStyled src={chatIcon} />
      </NavLinkStyled>
      <NavLinkStyled to="/profile">
        <IconStyled src={profileIcon} />
      </NavLinkStyled>
    </NavigationStyled>
  )
}

const NavigationStyled = styled.nav`
  display: grid;
  grid-auto-columns: 1fr;
  border-top: 2px solid var(--skyBlue);
`

const IconStyled = styled.img`
  height: 30px;
`

const NavLinkStyled = styled(NavLink)`
  grid-row: 1;
  display: grid;
  place-items: center;
  background-color: var(--iceBlue);

  &.active {
    background-color: var(--skyBlue);
  }
`
