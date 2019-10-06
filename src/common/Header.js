import React from 'react'
import styled from 'styled-components/macro'
import ppLogo from '../assets/pp-logo.png'
import coffeeFilterIcon from '../assets/coffee-filter-icon.svg'

export default function Header({ title, isFilterVisible, onFilterClick }) {
  return (
    <HeaderStyled>
      <LogoStyled src={ppLogo} />
      <TitleStyled>{title}</TitleStyled>
      {title === 'ping ponguin' && (
        <IconStyled
          isFilterVisible={isFilterVisible}
          src={coffeeFilterIcon}
          onClick={handleClick}
        ></IconStyled>
      )}
    </HeaderStyled>
  )

  function handleClick() {
    onFilterClick()
  }
}

const HeaderStyled = styled.header`
  display: grid;
  grid-template-columns: 48px auto 48px;
  place-items: center;
  grid-gap: 5px;
  background-color: #c2d4d8;
  padding: 5px 5px 0 5px;
  border-bottom: 2px solid #418ab3;
`

const TitleStyled = styled.h1`
  margin: 0;
  color: #418ab3;
`

const LogoStyled = styled.img`
  height: 32px;
`

const IconStyled = styled.img`
  height: 40px;
  outline: ${({ isFilterVisible }) => isFilterVisible && '10px #418ab3 solid'};
  background-color: ${({ isFilterVisible }) => isFilterVisible && '#418ab3'};
`
