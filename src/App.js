import React from 'react'
import styled from 'styled-components/macro'
import playerData from './playerData.json'
import Header from './common/Header.js'
import PlayersList from './players/PlayersList.js'

export default function App() {
  return (
    <AppStyled>
      <Header></Header>
      <PlayersList playerData={playerData}></PlayersList>
    </AppStyled>
  )
}

const AppStyled = styled.div`
  display: grid;
  grid-template-rows: 48px auto;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  overflow: auto;
`
