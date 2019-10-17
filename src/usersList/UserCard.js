import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

UserCard.propTypes = {
  name: PropTypes.string,
  residence: PropTypes.string,
  abilityLeft: PropTypes.string,
  abilityRight: PropTypes.string,
  imageURL: PropTypes.string,
}

export default function UserCard({
  name,
  residence,
  abilityLeft,
  abilityRight,
  imageURL,
}) {
  return (
    <UserCardStyled>
      <NameStyled>{name}</NameStyled>
      <ImageStyled src={imageURL}></ImageStyled>
      <ResidenceStyled>Wohnort: {residence}</ResidenceStyled>
      <div>
        Spielstärke
        <AbilityStyled>links: {abilityLeft}</AbilityStyled>
        <AbilityStyled>rechts: {abilityRight}</AbilityStyled>
      </div>
    </UserCardStyled>
  )
}

const UserCardStyled = styled.section`
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
  height: 150px;
  width: 150px;
  border-radius: 75px 75px 55.5px 55.5px;
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
