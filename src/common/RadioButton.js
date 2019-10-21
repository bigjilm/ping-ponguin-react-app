import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

RadioButton.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  activeRadio: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

export default function RadioButton({
  value,
  name,
  activeRadio = '',
  onClick,
  disabled = false,
}) {
  return (
    <LabelStyled value={value} activeRadio={activeRadio}>
      {value}
      <RadioButtonStyled
        type="radio"
        name={name}
        value={value}
        onClick={handleClick}
        disabled={disabled}
      />
    </LabelStyled>
  )

  function handleClick(event) {
    onClick(event.currentTarget.value)
  }
}

const LabelStyled = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 30px;
  border-radius: 5px;
  background-color: ${props =>
    props.value === props.activeRadio ? 'var(--plantGreen)' : 'var(--iceBlue)'};
`

const RadioButtonStyled = styled.input`
  display: none;
`
