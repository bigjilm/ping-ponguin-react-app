import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

RadioButton.propTypes = {
  labelName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  activeRadio: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default function RadioButton({
  labelName,
  name,
  activeRadio = '',
  onClick,
}) {
  return (
    <LabelStyled value={labelName} activeRadio={activeRadio}>
      {labelName}
      <RadioButtonStyled
        type="radio"
        name={name}
        value={labelName}
        onClick={handleClick}
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
  border-radius: 5px;
  width: 40px;
  height: 30px;
  background-color: ${props =>
    props.value === props.activeRadio ? 'var(--plantGreen)' : 'var(--iceBlue)'};
`

const RadioButtonStyled = styled.input`
  display: none;
`
