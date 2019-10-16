import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/macro'
import Alert from '../Alert'

TextInput.propTypes = {
  labelName: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  missingInputs: PropTypes.arrayOf(PropTypes.string),
}

export default function TextInput({
  labelName = '',
  name,
  value = '',
  type = 'text',
  placeholder,
  maxLength = 1000,
  missingInputs = [],
  onChange,
}) {
  return (
    <LabelStyled>
      {labelName}
      <InputStyled
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
      />
      {value.length === maxLength && <Alert>max. {maxLength} Zeichen</Alert>}
      {missingInputs.includes(name) && <Alert target={name}></Alert>}
    </LabelStyled>
  )

  function handleChange(event) {
    const inputName = event.currentTarget.name
    const inputValue = event.currentTarget.value
    const changedProp = { [inputName]: inputValue }
    onChange(changedProp)
  }
}

const LabelStyled = styled.label`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 10px;
  font-weight: bold;
`

const InputStyled = styled.input`
  width: 315px;
  height: 30px;

  :focus {
    border-color: #849237;
  }
`
