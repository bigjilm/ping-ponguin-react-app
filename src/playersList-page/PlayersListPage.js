import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Header from './Header'
import Filter from './Filter'
import PlayersList from './PlayersList'

PlayersListPage.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object),
}

export default function PlayersListPage({ players }) {
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [residenceFilterValue, setResidenceFilterValue] = useState('')
  const [abilityFilterValues, setAbilityFilterValues] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    'alle',
  ])

  return (
    <PlayersListPageStyled>
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
      {withPlayersList(players)}
    </PlayersListPageStyled>
  )
  function handleFilterClick() {
    setIsFilterVisible(!isFilterVisible)
  }

  function withPlayersList(players) {
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
    return <PlayersList players={playersFilteredByResidenceAndAbility} />
  }
}

const PlayersListPageStyled = styled.main`
  display: grid;
  grid-template-rows: 48px auto;
  overflow: auto;
`
