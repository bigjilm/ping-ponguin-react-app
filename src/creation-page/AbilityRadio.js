import React from 'react'
import PropTypes, { func } from 'prop-types'
import styled from 'styled-components/macro'
import RadioButton from './RadioButton'

AbilityRadios.propTypes = {}

export default function AbilityRadios({ hand, activeRadio, onClick }) {
  const values = [1, 2, 3, 4, 5]

  return (
    <AbilityRadiosStyled>
      <HeadlineStyled>{hand}</HeadlineStyled>
      {values.map(value => (
        <RadioButton
          key={value}
          value={value}
          activeRadio={activeRadio}
          onClick={onClick}
        />
      ))}
    </AbilityRadiosStyled>
  )
}

const AbilityRadiosStyled = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
`

const HeadlineStyled = styled.h4`
  margin: 0;
  width: 50px;
`
