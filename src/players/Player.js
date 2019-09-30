import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function PlayerCard({
  name,
  residence,
  abilityLeft,
  abilityRight,
}) {
  return (
    <PlayerCardStyled>
      <NameStyled>{name}</NameStyled>
      <ResidenceStyled>Wohnort: {residence}</ResidenceStyled>
      <div>
        Spielstärke
        <AbilityStyled>links: {abilityLeft}</AbilityStyled>
        <AbilityStyled>rechts: {abilityRight}</AbilityStyled>
      </div>
    </PlayerCardStyled>
  )
}

const PlayerCardStyled = styled.section`
  display: grid;
  grid-template-rows: 1fr 1fr 2fr;
  grid-gap: 5px;
  background-color: #c2d4d8;
  border-radius: 10px;
  padding: 10px;
`

const ImageStyled = styled.img``

const NameStyled = styled.span`
  font-size: 1.5em;
  font-weight: bold;
`

const ResidenceStyled = styled.span``

const AbilityStyled = styled.div`
  margin-left: 20px;
`
