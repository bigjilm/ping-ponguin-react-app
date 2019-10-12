import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Alert.propTypes = {
  target: PropTypes.string,
  children: PropTypes.node,
}

export default function Alert({ target, children }) {
  return <AlertStyled>{target ? setAlert(target) : children}</AlertStyled>

  function setAlert(target) {
    const alertName = {
      name: 'Bitte gib einen Namen ein',
      residence: 'Bitte gib einen Wohnort ein',
      abilityLeft: 'Bitte gib an, wie gut du mit links spielst',
      abilityRight: 'Bitte gib an, wie gut du mit rechts spielst',
      email: 'Bitte gib eine E-Mail-Adresse ein',
      password: 'Bitte gib ein Passwort ein',
    }
    return alertName[target]
  }
}

const AlertStyled = styled.span`
  font-size: 14px;
  color: #c8232a;
`
