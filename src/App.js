import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import playerData from './playerData.json'
import Header from './common/Header'
import Filter from './players/Filter'
import PlayersListPage from './players/PlayersListPage'
import CreationPage from './creation-page/CreationPage'
import Navigation from './common/Navigation'

export default function App() {
  const [players, setPlayers] = useState(playerData)
  const [isFilterVisible, setIsFilterVisible] = useState(true)
  const [residenceFilterValue, setResidenceFilterValue] = useState('')
  const [abilityFilterValues, setAbilityFilterValues] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    'all',
  ])

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
            abilityFilterValues={abilityFilterValues}
            onChangeAbilityFilterValues={setAbilityFilterValues}
          ></Filter>
        )}
        <Switch>
          <Route exact path="/">
            {withPlayersListPage(players)}
            {/* <PlayersListPage players={players}></PlayersListPage> */}
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

  function withPlayersListPage() {
    const playersFilteredByResidence = players.filter(
      player =>
        player.residence === residenceFilterValue ||
        residenceFilterValue.length === 0
    )
    const playersFilteredByResidenceAndAbility = playersFilteredByResidence.filter(
      player =>
        abilityFilterValues.includes(player.abilityLeft) ||
        abilityFilterValues.includes(player.abilityRight)
    )
    return <PlayersListPage players={playersFilteredByResidenceAndAbility} />
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
