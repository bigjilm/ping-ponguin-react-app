import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import PlayerCard from './PlayerCard.js'

PlayersListPage.propTypes = {
  playerData: PropTypes.arrayOf(PropTypes.object),
}

export default function PlayersListPage({ players }) {
  return (
    <PlayersListPageStyled>
      {players.map((player, index) => (
        <PlayerCard key={index} {...player}></PlayerCard>
      ))}
    </PlayersListPageStyled>
  )
}

const PlayersListPageStyled = styled.main`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 10px;
  overflow-y: auto;
  scroll-behavior: smooth;
  background-color: #418ab3;
  padding: 10px;
`
