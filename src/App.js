import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import playerData from './playerData.json'
import Header from './common/Header.js'
import PlayersList from './players/PlayersList.js'
import CreationPage from './creation-page/CreationPage.js'
import Navigation from './common/Navigation.js'

export default function App() {
  const [players, setPlayers] = useState(playerData)

  return (
    <Router>
      <AppStyled>
        <Header />
        <Switch>
          <Route exact path="/">
            <PlayersList playerData={players}></PlayersList>
          </Route>
          <Route exact path="/profile">
            <CreationPage onSubmit={handleSubmit}></CreationPage>
          </Route>
        </Switch>
        <Navigation />
      </AppStyled>
    </Router>
  )

  function handleSubmit(newPlayer) {
    setPlayers([newPlayer, ...players])
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
