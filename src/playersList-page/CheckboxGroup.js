import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Checkbox from './Checkbox'

CheckboxGroup.propTypes = {
  activeCheckboxes: PropTypes.array,
  setActiveCheckboxes: PropTypes.func,
}

export default function CheckboxGroup({
  activeCheckboxes,
  setActiveCheckboxes,
}) {
  const values = ['1', '2', '3', '4', '5', 'alle']

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
    if (changedCheckbox === 'alle') {
      activeCheckboxes.includes('alle')
        ? setActiveCheckboxes([])
        : setActiveCheckboxes(['1', '2', '3', '4', '5', 'alle'])
    } else {
      activeCheckboxes.includes(changedCheckbox)
        ? unCheck(changedCheckbox)
        : check(changedCheckbox)
    }
  }

  function check(checkbox) {
    activeCheckboxes.length === 4
      ? setActiveCheckboxes([...activeCheckboxes, checkbox, 'alle'])
      : setActiveCheckboxes([...activeCheckboxes, checkbox])
  }

  function unCheck(checkbox) {
    const index = activeCheckboxes.indexOf(checkbox)
    activeCheckboxes.includes('alle')
      ? setActiveCheckboxes([
          ...activeCheckboxes.slice(0, index),
          ...activeCheckboxes.slice(index + 1, activeCheckboxes.length - 1),
        ])
      : setActiveCheckboxes([
          ...activeCheckboxes.slice(0, index),
          ...activeCheckboxes.slice(index + 1),
        ])
  }
}

const CheckboxGroupStyled = styled.div`
  display: grid;
  grid-auto-flow: column;
`
