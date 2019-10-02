import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

PlayerCard.propTypes = {
  name: PropTypes.string,
  residence: PropTypes.string,
  abilityLeft: PropTypes.number,
  abilityRight: PropTypes.number,
}

export default function PlayerCard({
  name,
  residence,
  abilityLeft,
  abilityRight,
  image,
}) {
  return (
    <PlayerCardStyled>
      <NameStyled>{name}</NameStyled>
      <ImageStyled src={image}></ImageStyled>
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
  grid-template-rows: auto auto auto;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'name image'
    'residence image'
    'ability image';
  grid-gap: 10px;
  background-color: #c2d4d8;
  padding: 20px;
`

const ImageStyled = styled.img`
  grid-area: image;
  justify-self: center;
  height: 100px;
  width: 100px;
  border-radius: 50px 50px 37px 37px;
  object-fit: cover;
`

const NameStyled = styled.span`
  grid-area: name;
  font-size: 1.5em;
  font-weight: bold;
`

const ResidenceStyled = styled.span`
  grid-area: residence;
`

const AbilityStyled = styled.div`
  grid-area: ability;
  margin-left: 20px;
`
