import React from 'react'
import styled from 'styled-components/macro'
import playerData from './playerData.json'
import Header from './common/Header.js'
import PlayersList from './players/PlayersList.js'

export default function App() {
  return (
    <AppStyled>
      <Header></Header>
    </AppStyled>
  )
}

const AppStyled = styled.div`
  display: grid;
  grid-template-rows: 48px auto;
`
