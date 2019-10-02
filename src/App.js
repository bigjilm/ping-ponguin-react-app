import React, { useState } from 'react'
import styled from 'styled-components/macro'
import playerData from './playerData.json'
import Header from './common/Header.js'
import PlayersList from './players/PlayersList.js'
import CreationPage from './creation-page/CreationPage.js'
import Footer from './common/Footer.js'

export default function App() {
  const [players, setPlayers] = useState(playerData)

  return (
    <AppStyled>
      <Header></Header>
      {/* <PlayersList playerData={players}></PlayersList> */}
      <CreationPage onSubmit={handleSubmit}></CreationPage>
      <Footer></Footer>
    </AppStyled>
  )

  function handleSubmit(newPlayer) {
    setPlayers([...players, newPlayer])
  }
}

const AppStyled = styled.div`
  display: grid;
  grid-template-rows: 48px auto 48px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  overflow: auto;
`
