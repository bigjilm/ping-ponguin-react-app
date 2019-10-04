import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import CheckboxGroup from './CheckboxGroup'

export default function Filter({
  residenceFilterValue,
  onChangeResidenceFilterValue,
}) {
  useEffect(() => {
    document.querySelector('[name=residenceFilterInput]').focus()
  }, [])

  return (
    <FilterStyled>
      <h3>Filtern nach:</h3>
      <LabelStyled>
        Wohnort
        <InputStyled
          name="residenceFilterInput"
          value={residenceFilterValue}
          onChange={event =>
            onChangeResidenceFilterValue(event.currentTarget.value)
          }
        />
      </LabelStyled>
      <LabelStyled>
        Spielstärke
        <CheckboxGroup />
      </LabelStyled>
    </FilterStyled>
  )
}

const FilterStyled = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 10px;
  height: 300px;
  width: 300px;
  background-color: #418ab3;
  box-shadow: -7px 7px 6px 0;
  border-bottom-left-radius: 20px;
  padding: 10px;
`

const LabelStyled = styled.label`
  display: grid;
  grid-gap: 10px;
`

const InputStyled = styled.input`
  width: 200px;
  height: 30px;

  :focus {
    border-color: #849237;
  }
`
