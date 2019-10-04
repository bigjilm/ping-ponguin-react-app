import React from 'react'
import { NavLink } from 'react-router-dom'

import styled from 'styled-components/macro'
import homeIcon from '../assets/home-icon.svg'
import profileIcon from '../assets/profile-icon.svg'

export default function Navigation() {
  return (
    <NavigationStyled>
      <NavLinkStyled exact to="/">
        <IconStyled src={homeIcon} />
      </NavLinkStyled>
      <NavLinkStyled to="/profile">
        <IconStyled src={profileIcon} />
      </NavLinkStyled>
    </NavigationStyled>
  )
}

const NavigationStyled = styled.nav`
  display: grid;
  grid-auto-flow: column;
  border-top: 2px solid #418ab3;
`

const IconStyled = styled.img`
  height: 30px;
`

const NavLinkStyled = styled(NavLink)`
  display: grid;
  place-items: center;
  background-color: #c2d4d8;

  &.active {
    background-color: #418ab3;
  }
`
