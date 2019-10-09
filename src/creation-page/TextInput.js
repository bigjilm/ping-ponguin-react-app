import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

TextInput.propTypes = {
  labelName: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number,
}

export default function TextInput({
  labelName,
  name,
  placeholder,
  type = 'text',
  maxLength = 1000,
  missingInputs = [],
}) {
  const [inputValue, setInputValue] = useState('')

  return (
    <LabelStyled>
      {labelName}
      <InputStyled
        name={name}
        placeholder={placeholder}
        type={type}
        value={inputValue}
        onChange={event => setInputValue(event.currentTarget.value)}
        maxLength={maxLength}
      />
      {inputValue.length === maxLength && (
        <AlertStyled>max. 20 Zeichen</AlertStyled>
      )}
      {missingInputs.includes(name) && (
        <AlertStyled>Bitte gib deinen {setAlert(name)} ein</AlertStyled>
      )}
    </LabelStyled>
  )

  function setAlert(name) {
    const alertName = {
      name: 'Namen',
      residence: 'Wohnort',
    }
    return alertName[name]
  }
}

const LabelStyled = styled.label`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 10px;
  font-weight: bold;
`

const InputStyled = styled.input`
  width: 300px;
  height: 30px;

  :focus {
    border-color: #849237;
  }
`

const AlertStyled = styled.span`
  font-size: 14px;
  color: #c8232a;
`
