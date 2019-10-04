import React from 'react'
import styled from 'styled-components/macro'

export default function Filter({
  residenceFilterValue,
  onChangeResidenceFilterValue,
}) {
  return (
    <FilterStyled>
      <h3>Filtern nach:</h3>
      <LabelStyled>
        Wohnort
        <InputStyled
          value={residenceFilterValue}
          onChange={event =>
            onChangeResidenceFilterValue(event.currentTarget.value)
          }
        />
      </LabelStyled>
    </FilterStyled>
  )
}

const FilterStyled = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  height: 200px;
  width: 250px;
  background-color: #418ab3;
  box-shadow: -7px 7px 6px 0;
  border-bottom-left-radius: 20px;
  padding: 10px;
`

const LabelStyled = styled.label`
  display: grid;
  grid-gap: 10px;
`

const InputStyled = styled.input``
