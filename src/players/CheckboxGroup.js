import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Checkbox from './Checkbox'

export default function CheckboxGroup({
  activeCheckboxes,
  setActiveCheckboxes,
}) {
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
    const changedCheckbox = event.currentTarget.name
    if (changedCheckbox === 'all') {
      activeCheckboxes.includes('all') ? unCheckAll() : checkAll()
    } else {
      activeCheckboxes.includes(changedCheckbox)
        ? unCheck(changedCheckbox)
        : check(changedCheckbox)
      console.log(activeCheckboxes)
    }
  }

  function check(checkbox) {
    activeCheckboxes.length === 4
      ? setActiveCheckboxes([...activeCheckboxes, checkbox, 'all'])
      : setActiveCheckboxes([...activeCheckboxes, checkbox])
  }

  function unCheck(checkbox) {
    const index = activeCheckboxes.indexOf(checkbox)
    activeCheckboxes.includes('all')
      ? setActiveCheckboxes([
          ...activeCheckboxes.slice(0, index),
          ...activeCheckboxes.slice(index + 1, activeCheckboxes.length - 1),
        ])
      : setActiveCheckboxes([
          ...activeCheckboxes.slice(0, index),
          ...activeCheckboxes.slice(index + 1),
        ])
  }

  function checkAll() {
    setActiveCheckboxes(['1', '2', '3', '4', '5', 'all'])
  }

  function unCheckAll() {
    setActiveCheckboxes([])
  }
}

const CheckboxGroupStyled = styled.div`
  display: grid;
  grid-auto-flow: column;
`
