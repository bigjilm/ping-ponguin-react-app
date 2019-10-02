import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function TextInput({ name, value, onChange }) {
  return (
    <LabelStyled>
      {name}
      <InputStyled
        value={value}
        onChange={event => onChange(event.currentTarget.value)}
      ></InputStyled>
    </LabelStyled>
  )
}

const LabelStyled = styled.label`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 10px;
  font-weight: bold;
`

const InputStyled = styled.input`
  width: 200px;
  border: none;

  :focus {
    outline: 2px solid;
    outline-color: #849237;
  }
`
