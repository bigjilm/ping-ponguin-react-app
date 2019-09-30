import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import PlayerCard from './PlayerCard.js'

PlayersList.propTypes = {
  playerData: PropTypes.arrayOf(PropTypes.object),
}

export default function PlayersList({ playerData }) {
  return (
    <PlayersListStyled>
      {playerData.map((player, index) => (
        <PlayerCard
          key={index}
          name={player.name}
          residence={player.residence}
          abilityLeft={player.abilityLeft}
          abilityRight={player.abilityRight}
        ></PlayerCard>
      ))}
    </PlayersListStyled>
  )
}

const PlayersListStyled = styled.main`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 10px;
  overflow-y: auto;
  scroll-behavior: smooth;
  background-color: #418ab3;
  padding: 10px;
`
