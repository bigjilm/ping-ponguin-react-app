import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Checkbox from './Checkbox'

export default function CheckboxGroup() {
  const [activeCheckboxes, setActiveCheckboxes] = useState([])

  const values = ['1', '2', '3', '4', '5', 'all']

  return (
    <CheckboxGroupStyled>
      {values.map(value => (
        <Checkbox
          key={value}
          value={value}
          activeCheckboxes={activeCheckboxes}
          onChange={handleChange}
        />
      ))}
    </CheckboxGroupStyled>
  )

  function handleChange(event) {
    const currentCheckbox = event.currentTarget.name
    const currentCheckboxIndex = activeCheckboxes.indexOf(currentCheckbox)
    activeCheckboxes.includes(currentCheckbox)
      ? setActiveCheckboxes([
          ...activeCheckboxes.slice(0, currentCheckboxIndex),
          ...activeCheckboxes.slice(currentCheckboxIndex + 1),
        ])
      : setActiveCheckboxes([...activeCheckboxes, currentCheckbox])
    console.log(activeCheckboxes)
  }
}

const FormStyled = styled.form`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 10px;
`

const CheckboxGroupStyled = styled.div`
  display: grid;
  grid-auto-flow: column;
`

const ButtonStyled = styled.button``
