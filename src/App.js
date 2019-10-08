import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import Navigation from './common/Navigation'
import CreationPage from './creation-page/CreationPage'
import PlayersListPage from './playersList-page/PlayersListPage'
import { getPlayers } from './services'

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
    setPlayers([...players, newPlayer])
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
