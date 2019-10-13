import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import RadioButton from './RadioButton'
import Alert from '../common/Alert'

RadioButtonGroup.propTypes = {
  name: PropTypes.string,
}

export default function RadioButtonGroup({ name, missingInputs }) {
  const [activeRadio, setActiveRadio] = useState()
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
          onClick={setActiveRadio}
        />
      ))}
      {missingInputs.includes(name) && (
        <GridItemStyled>
          <Alert target={name} />
        </GridItemStyled>
      )}
    </RadioButtonGroupStyled>
  )
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
