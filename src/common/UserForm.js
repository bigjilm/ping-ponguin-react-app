import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { FormStyled, ButtonStyled, Cushion } from './StyledElements'
import TextInputControlled from './TextInputControlled'
import RadioButtonGroup from '../login/RadioButtonGroup'
import Alert from './Alert'

export default function UserForm({ user, onSubmit, onChange }) {
  const [missingInputs, setMissingInputs] = useState([])
  const [alert, setAlert] = useState('')

  return (
    <FormStyled onSubmit={onSubmit}>
      <TextInputControlled
        labelName="Name"
        name="name"
        value={user.name}
        placeholder="Gib hier deinen Namen ein"
        maxLength={20}
        missingInputs={missingInputs}
        onChange={handleChange}
      />
      <TextInputControlled
        labelName="Wohnort"
        name="residence"
        value={user.residence}
        placeholder="Gib hier deinen Wohnort ein"
        maxLength={50}
        missingInputs={missingInputs}
        onChange={handleChange}
      />
      <ContainerStyled>
        Spielstärke
        <StyledParagraph>
          Schätze deine Spielstärke auf einer Skala von 1 (Blinge) bis 5 (Profi)
          ein.
        </StyledParagraph>
        <RadioButtonGroup
          name="abilityLeft"
          missingInputs={missingInputs}
        ></RadioButtonGroup>
        <RadioButtonGroup
          name="abilityRight"
          missingInputs={missingInputs}
        ></RadioButtonGroup>
      </ContainerStyled>
      <TextInputControlled
        labelName="Bild per URL einfügen (optional)"
        name="imageURL"
        value={user.imageURL}
        placeholder="Gib hier die URL deines Bildes ein"
        onChange={handleChange}
      />
      <TextInputControlled
        labelName="E-Mail"
        name="email"
        value={user.email}
        placeholder="Gib hier deine E-Mail-Adresse ein"
        missingInputs={missingInputs}
        onChange={handleChange}
      />
      <TextInputControlled
        labelName="Passwort"
        name="password"
        value={user.password}
        type="password"
        placeholder="Gib hier ein Passwort ein"
        missingInputs={missingInputs}
        onChange={handleChange}
      />
      {alert && <Alert>{alert}</Alert>}
      <ButtonStyled>Speichern</ButtonStyled>
      <Cushion />
    </FormStyled>
  )

  function handleChange(changedProp) {
    onChange(changedProp)
  }
}

const ContainerStyled = styled.div`
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
