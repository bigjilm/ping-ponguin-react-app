import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import RadioButton from './RadioButton'

AbilityRadios.propTypes = {
  hand: PropTypes.string,
  name: PropTypes.string,
  activeRadio: PropTypes.number,
  onClick: PropTypes.func,
}

export default function AbilityRadios({ hand, name, activeRadio, onClick }) {
  const values = [1, 2, 3, 4, 5]

  return (
    <AbilityRadiosStyled>
      <HeadlineStyled>{hand}</HeadlineStyled>
      {values.map(value => (
        <RadioButton
          key={value}
          value={value}
          name={name}
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
  align-items: center;
`

const HeadlineStyled = styled.h4`
  margin: 0;
  width: 50px;
`
