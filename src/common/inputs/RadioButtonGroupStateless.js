import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/macro'
import Alert from '../Alert'
import RadioButton from './RadioButton'

RadioButtonGroup.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  missingInputs: PropTypes.arrayOf(PropTypes.string),
}

export default function RadioButtonGroup({
  name,
  activeRadio = '',
  missingInputs = [],
  onClick,
}) {
  const values = ['1', '2', '3', '4', '5']

  return (
    <RadioButtonGroupStyled>
      <HeadlineStyled>
        {name === 'abilityLeft' ? 'links' : 'rechts'}
      </HeadlineStyled>
      {values.map(value => (
        <RadioButton
          key={value}
          value={value}
          name={name}
          activeRadio={activeRadio}
          onClick={handleClick}
        />
      ))}
      {missingInputs.includes(name) && (
        <GridItemStyled>
          <Alert target={name} />
        </GridItemStyled>
      )}
    </RadioButtonGroupStyled>
  )

  function handleClick(value) {
    const changedProp = { [name]: value }
    onClick(changedProp)
  }
}

const RadioButtonGroupStyled = styled.label`
  display: grid;
  grid-template-columns: 50px repeat(5, 1fr);
  grid-gap: 10px;
  align-items: center;
`

const HeadlineStyled = styled.h4`
  margin: 0;
  font-weight: normal;
`
const GridItemStyled = styled.div`
  grid-column: 1 / 6;
`
