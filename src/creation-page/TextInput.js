import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

TextInput.propTypes = {
  labelName: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  maxLength: PropTypes.number,
}

export default function TextInput({
  labelName,
  name,
  placeholder,
  type = 'text',
  value,
  onChange,
  maxLength = 1000,
}) {
  return (
    <LabelStyled>
      {labelName}
      <InputStyled
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={event => onChange(event.currentTarget.value)}
        maxLength={maxLength}
      />
      {value.length === maxLength && <AlertStyled>max. 20 Zeichen</AlertStyled>}
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
  width: 300px;
  height: 30px;
  /* border: none; */

  :focus {
    border-color: #849237;
  }
`

const AlertStyled = styled.span`
  font-size: 14px;
  color: #c8232a;
`
