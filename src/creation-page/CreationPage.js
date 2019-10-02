import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import AbilityRadios from './AbilityRadios'
import TextInput from './TextInput'

CreationPage.propTypes = {}

export default function CreationPage({ onSubmit }) {
  const [formData, setFormData] = useState({})
  const [playerName, setPlayerName] = useState('')
  const [residence, setResidence] = useState('')
  const [abilityLeft, setAbilityLeft] = useState(0)
  const [abilityRight, setAbilityRight] = useState(0)

  return (
    <CreationPageStyled>
      <FormStyled onSubmit={handleSubmit}>
        <TextInput
          labelName="Name"
          name="playerName"
          value={playerName}
          onChange={setPlayerName}
        />
        <TextInput
          labelName="Wohnort"
          name="residence"
          value={residence}
          onChange={setResidence}
        />
        <LabelStyled>
          Spielstärke
          <StyledP>
            Schätze deine Spielstärke auf einer Skala von 1 (Blinge) bis 5
            (Profi) ein.
          </StyledP>
          <AbilityRadios
            hand="links"
            name="abilityLeft"
            activeRadio={abilityLeft}
            onClick={setAbilityLeft}
          ></AbilityRadios>
          <AbilityRadios
            hand="rechts"
            name="abilityRight"
            activeRadio={abilityRight}
            onClick={setAbilityRight}
          ></AbilityRadios>
        </LabelStyled>
        <ButtonStyled>Profil Erstellen</ButtonStyled>
      </FormStyled>
    </CreationPageStyled>
  )

  function handleSubmit(event) {
    event.preventDefault()
    setFormData({
      name: playerName,
      residence: residence,
      abilityLeft: abilityLeft,
      abilityRight: abilityRight,
      image: '',
    })
    onSubmit(formData)
  }
}

const CreationPageStyled = styled.main`
  background-color: #418ab3;
  padding: 10px;
`

const FormStyled = styled.form`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 20px;
`

const LabelStyled = styled.label`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 10px;
  font-weight: bold;
`

const StyledP = styled.p`
  font-size: 14px;
  font-weight: normal;
  margin: 0;
`

const ButtonStyled = styled.button`
  justify-self: center;
  width: 150px;
  height: 50px;
  background-color: #c2d4d8;
  border-radius: 5px;
`
