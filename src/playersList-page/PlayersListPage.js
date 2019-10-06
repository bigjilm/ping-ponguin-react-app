import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Page from '../common/Page'
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
    <Page
      title="ping ponguin"
      isFilterVisible={isFilterVisible}
      onFilterClick={handleFilterClick}
    >
      {isFilterVisible && (
        <Filter
          residenceFilterValue={residenceFilterValue}
          onChangeResidenceFilterValue={setResidenceFilterValue}
          abilityFilterValues={abilityFilterValues}
          onChangeAbilityFilterValues={setAbilityFilterValues}
        ></Filter>
      )}
      {withPlayersList(players)}
    </Page>
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
