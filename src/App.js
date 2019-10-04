import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import playerData from './playerData.json'
import Header from './common/Header'
import Filter from './players/Filter'
import PlayersList from './players/PlayersList'
import CreationPage from './creation-page/CreationPage'
import Navigation from './common/Navigation'

export default function App() {
  const [players, setPlayers] = useState(playerData)
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [residenceFilterValue, setResidenceFilterValue] = useState('')

  return (
    <Router>
      <AppStyled>
        <Header
          isFilterVisible={isFilterVisible}
          onFilterClick={handleFilterClick}
        />
        {isFilterVisible && (
          <Filter
            residenceFilterValue={residenceFilterValue}
            onChangeResidenceFilterValue={setResidenceFilterValue}
          ></Filter>
        )}
        <Switch>
          <Route exact path="/">
            <PlayersList playerData={players}></PlayersList>
          </Route>
          <Route path="/profile">
            <CreationPage onSubmit={handleSubmit}></CreationPage>
          </Route>
        </Switch>
        <Navigation />
      </AppStyled>
    </Router>
  )

  function handleFilterClick() {
    setIsFilterVisible(!isFilterVisible)
  }

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
