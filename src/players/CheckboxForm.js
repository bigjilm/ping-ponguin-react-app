import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Checkbox from './Checkbox'

export default function CheckboxForm() {
  const [activeCheckboxes, setActiveCheckboxes] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    'all',
  ])

  return (
    <FormStyled onSubmit={handleSubmit}>
      <CheckboxGroupStyled>
        {activeCheckboxes.map(value => (
          <Checkbox
            key={value}
            value={value}
            activeCheckboxes={activeCheckboxes}
          />
        ))}
      </CheckboxGroupStyled>
      <ButtonStyled>Submit</ButtonStyled>
    </FormStyled>
  )

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    const dataArray = Object.values(data)
    console.log(dataArray)
    setActiveCheckboxes(dataArray)
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
