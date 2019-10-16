import React from 'react'
import styled from 'styled-components/macro'
import { FormStyled, ButtonStyled, Cushion } from './StyledElements'
import TextInput from './TextInput'
import RadioButtonGroup from '../login/RadioButtonGroup'
import Alert from './Alert'

export default function UserForm({ onSubmit, missingInputs }) {
  return (
    <FormStyled onSubmit={onSubmit}>
      <TextInput
        labelName="Name"
        name="name"
        placeholder="Gib hier deinen Namen ein"
        maxLength={20}
        missingInputs={missingInputs}
      />
      <TextInput
        labelName="Wohnort"
        name="residence"
        placeholder="Gib hier deinen Wohnort ein"
        maxLength={50}
        missingInputs={missingInputs}
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
      <TextInput
        labelName="Bild per URL einfügen (optional)"
        name="imageURL"
        placeholder="Gib hier die URL deines Bildes ein"
      />
      <TextInput
        labelName="E-Mail"
        name="email"
        placeholder="Gib hier deine E-Mail-Adresse ein"
        missingInputs={missingInputs}
      />
      <TextInput
        labelName="Passwort"
        name="password"
        type="password"
        placeholder="Gib hier ein Passwort ein"
        missingInputs={missingInputs}
      />
      {alert && <Alert>{alert}</Alert>}
      <ButtonStyled>Speichern</ButtonStyled>
      <Cushion />
    </FormStyled>
  )
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
