import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import RadioButtonGroup from './RadioButtonGroup'
import TextInput from './TextInput'

CreationPage.propTypes = {
  onSubmit: PropTypes.func,
}

export default function CreationPage({ onSubmit }) {
  const [playerName, setPlayerName] = useState('')
  const [residence, setResidence] = useState('')
  const [abilityLeft, setAbilityLeft] = useState(0)
  const [abilityRight, setAbilityRight] = useState(0)
  const [imageURL, setImageURL] = useState('')
  const formData = {
    name: playerName,
    residence: residence,
    abilityLeft: abilityLeft,
    abilityRight: abilityRight,
    image: imageURL,
  }

  let history = useHistory()

  useEffect(() => {
    document.querySelector('input').focus()
  }, [])

  return (
    <CreationPageStyled>
      <FormStyled onSubmit={handleSubmit}>
        <TextInput
          labelName="Name"
          name="playerName"
          placeholder="Gib hier deinen Namen ein"
          value={playerName}
          onChange={setPlayerName}
          maxLength={20}
        />
        <TextInput
          labelName="Wohnort"
          name="residence"
          placeholder="Gib hier deinen Wohnort ein"
          value={residence}
          onChange={setResidence}
          maxLength={20}
        />
        <LabelStyled>
          Spielstärke
          <StyledParagraph>
            Schätze deine Spielstärke auf einer Skala von 1 (Blinge) bis 5
            (Profi) ein.
          </StyledParagraph>
          <RadioButtonGroup
            hand="links"
            name="abilityLeft"
            activeRadio={abilityLeft}
            onClick={setAbilityLeft}
          ></RadioButtonGroup>
          <RadioButtonGroup
            hand="rechts"
            name="abilityRight"
            activeRadio={abilityRight}
            onClick={setAbilityRight}
          ></RadioButtonGroup>
        </LabelStyled>
        <TextInput
          labelName="Bild per URL einfügen"
          name="imageURL"
          placeholder="Gib hier die URL deines Bildes ein"
          value={imageURL}
          onChange={setImageURL}
          type="url"
        />
        <ButtonStyled>Profil Erstellen</ButtonStyled>
      </FormStyled>
    </CreationPageStyled>
  )

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(formData)
    setPlayerName('')
    setResidence('')
    setAbilityLeft(0)
    setAbilityRight(0)
    setImageURL('')
    history.push('/')
  }
}

const CreationPageStyled = styled.main`
  overflow-y: auto;
  scroll-behavior: smooth;
  background-color: #418ab3;
  padding: 20px;
`

const FormStyled = styled.form`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 40px;
`

const LabelStyled = styled.label`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 20px;
  font-weight: bold;
`

const StyledParagraph = styled.p`
  font-size: 14px;
  font-weight: normal;
  margin: 0;
`

const ButtonStyled = styled.button`
  width: 150px;
  height: 50px;
  background-color: #c2d4d8;
  border-radius: 5px;
`
