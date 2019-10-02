import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import AbilityRadio from './AbilityRadio'

CreationPage.propTypes = {}

export default function CreationPage({}) {
  const [abilityLeft, setAbilityLeft] = useState(0)

  return (
    <CreationPageStyled>
      <FormStyled>
        <LabelStyled>
          Name
          <InputStyled></InputStyled>
        </LabelStyled>
        <LabelStyled>
          Wohnort
          <InputStyled></InputStyled>
        </LabelStyled>
        <LabelStyled>
          Spielstärke
          <StyledP>
            Schätze deine Spielstärke auf einer Skala von 1 (Blinge) bis 5
            (Profi) ein.
          </StyledP>
          <AbilityRadio
            hand="links"
            activeRadio={abilityLeft}
            onClick={handleClick}
          ></AbilityRadio>
        </LabelStyled>
      </FormStyled>
    </CreationPageStyled>
  )

  function handleClick(event) {
    setAbilityLeft(Number(event.currentTarget.value))
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

const InputStyled = styled.input``

const StyledP = styled.p`
  font-size: 14px;
  font-weight: normal;
  margin: 0;
`
