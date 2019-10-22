import React from 'react'
import styled from 'styled-components/macro'
import leftWing from '../assets/leftWing.png'
import rightWing from '../assets/rightWing.png'

export default function spreadWings(ability, side) {
  const abilityNumber = Number(ability)
  const wing = side === 'left' ? leftWing : rightWing
  const foo = []
  for (let i = 0; i < abilityNumber; i++) {
    foo.push(i)
  }
  return foo.map(bar => <WingStyled key={bar} src={wing} />)
}

const WingStyled = styled.img`
  height: 20px;
`
