import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Chat3, AccountCircle } from 'styled-icons/remix-line/'
import IglooIcon from '../assets/igloo-icon.png'

export default function Navigation() {
  return (
    <NavigationStyled>
      <NavLinkStyled exact to="/users">
        <IconStyled src={IglooIcon} />
      </NavLinkStyled>
      <NavLinkStyled to="/chat">
        <ChatIconStyled size="32" title="Chat Button" />
      </NavLinkStyled>
      <NavLinkStyled to="/profile">
        <ProfileIconStyled size="32" title="Profile Button" />
      </NavLinkStyled>
    </NavigationStyled>
  )
}

const NavigationStyled = styled.nav`
  display: grid;
  grid-auto-columns: 1fr;
  border-top: 2px solid var(--skyBlue);
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

const IconStyled = styled.img`
  height: 28px;
`

const ChatIconStyled = styled(Chat3)`
  color: black;
  font-weight: bold;
`

const ProfileIconStyled = styled(AccountCircle)`
  color: black;
`
