import PropTypes from 'prop-types'
import React from 'react'
import Alert from '../common/Alert'
import { InputStyled, LabelStyled } from '../common/styledElements'

TextInputControlled.propTypes = {
  labelName: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  missingInputs: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
}

export default function TextInputControlled({
  labelName = '',
  name,
  value = '',
  type = 'text',
  placeholder = '',
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
