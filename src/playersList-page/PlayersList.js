import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import PlayerCard from './PlayerCard'

PlayersList.propTypes = {
  players: PropTypes.array,
  onListClick: PropTypes.func,
}

export default function PlayersList({ players, onListClick }) {
  return (
    <PlayersListStyled onClick={onListClick}>
      {players.map(player => (
        <PlayerCard key={player._id} {...player}></PlayerCard>
      ))}
    </PlayersListStyled>
  )
}

const PlayersListStyled = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 10px;
  overflow-y: auto;
  scroll-behavior: smooth;
  background-color: #418ab3;
  padding: 10px;
`
