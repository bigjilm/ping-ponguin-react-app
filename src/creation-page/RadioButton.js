import React from 'react'
import PropTypes, { func } from 'prop-types'
import styled from 'styled-components/macro'

RadioButton.propTypes = {}

export default function RadioButton({ value, activeRadio, onClick }) {
  return (
    <LabelStyled value={value} activeRadio={activeRadio}>
      {value}
      <RadioButtonStyled
        type="radio"
        name="radioLeft"
        value={value}
        onClick={onClick}
      />
    </LabelStyled>
  )
}

const LabelStyled = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 30px;
  border-radius: 5px;
  /* background-color: #c2d4d8; */
  background-color: ${props =>
    props.value === props.activeRadio ? '#849237' : '#c2d4d8'};
`

const RadioButtonStyled = styled.input`
  display: none;
`
