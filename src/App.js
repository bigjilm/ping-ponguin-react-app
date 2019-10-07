import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import { getPlayers } from './services'
import PlayersListPage from './playersList-page/PlayersListPage'
import CreationPage from './creation-page/CreationPage'
import Navigation from './common/Navigation'

export default function App() {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    getPlayers().then(setPlayers)
  }, [])

  return (
    <Router>
      <AppStyled>
        <Switch>
          <Route exact path="/">
            <PlayersListPage players={players} />
          </Route>
          <Route path="/profile">
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
  grid-template-rows: auto 48px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  overflow: auto;
`
