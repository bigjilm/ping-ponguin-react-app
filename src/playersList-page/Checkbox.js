import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Checkbox.propTypes = {
  value: PropTypes.string,
  activeCheckboxes: PropTypes.array,
  onChange: PropTypes.func,
}

export default function Checkbox({ value, activeCheckboxes, onChange }) {
  return (
    <LabelStyled value={value} activeCheckboxes={activeCheckboxes}>
      {value}
      <CheckboxStyled
        checked={activeCheckboxes.includes(value)}
        name={value}
        type="checkbox"
        onChange={onChange}
      />
    </LabelStyled>
  )
}

const LabelStyled = styled.label`
  display: grid;
  place-items: center;
  width: 40px;
  height: 30px;
  border-radius: 5px;
  background-color: ${({ activeCheckboxes, value }) =>
    activeCheckboxes.includes(value) ? '#849237' : '#c2d4d8'};
`

const CheckboxStyled = styled.input`
  display: none;
`
