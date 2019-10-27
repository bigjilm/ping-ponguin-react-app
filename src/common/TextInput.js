import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Alert from './Alert'
import { InputStyled, LabelStyled } from './styledElements'

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


