import React from 'react'
import styled from 'styled-components/macro'
import playerData from './playerData.json'
import Header from './common/Header.js'
import PlayersList from './players/PlayersList.js'
import CreationPage from './creation-page/CreationPage.js'
import Footer from './common/Footer.js'

export default function App() {
  return (
    <AppStyled>
      <Header></Header>
      {/* <PlayersList playerData={playerData}></PlayersList> */}
      <CreationPage></CreationPage>
      <Footer></Footer>
    </AppStyled>
  )
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
