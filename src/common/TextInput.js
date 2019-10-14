import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Alert from '../common/Alert'

TextInput.propTypes = {
  labelName: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  missingInputs: PropTypes.arrayOf(PropTypes.string),
}

export default function TextInput({
  labelName,
  name,
  type = 'text',
  placeholder,
  maxLength = 1000,
  missingInputs = [],
}) {
  //no controlled input; state just for length check
  const [inputValue, setInputValue] = useState('')

  return (
    <LabelStyled>
      {labelName}
      <InputStyled
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={event => setInputValue(event.currentTarget.value)}
        maxLength={maxLength}
      />
      {inputValue.length === maxLength && (
        <Alert>max. {maxLength} Zeichen</Alert>
      )}
      {missingInputs.includes(name) && <Alert target={name}></Alert>}
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
  width: 315px;
  height: 30px;

  :focus {
    border-color: #849237;
  }
`
