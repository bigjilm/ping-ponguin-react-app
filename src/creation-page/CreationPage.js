import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import AbilityRadios from './AbilityRadios'
import TextInput from './TextInput'

CreationPage.propTypes = {}

export default function CreationPage() {
  const [abilityLeft, setAbilityLeft] = useState(0)
  const [abilityRight, setAbilityRight] = useState(0)

  return (
    <CreationPageStyled>
      <FormStyled>
        <TextInput name="Name" />
        <TextInput name="Wohnort" />
        <LabelStyled>
          Spielstärke
          <StyledP>
            Schätze deine Spielstärke auf einer Skala von 1 (Blinge) bis 5
            (Profi) ein.
          </StyledP>
          <AbilityRadios
            hand="links"
            activeRadio={abilityLeft}
            onClick={setAbilityLeft}
          ></AbilityRadios>
          <AbilityRadios
            hand="rechts"
            activeRadio={abilityRight}
            onClick={setAbilityRight}
          ></AbilityRadios>
        </LabelStyled>
      </FormStyled>
    </CreationPageStyled>
  )
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
