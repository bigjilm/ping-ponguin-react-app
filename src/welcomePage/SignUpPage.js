import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import TextInput from '../common/TextInput'
import { signUp } from '../utils/services'
import RadioButtonGroup from './RadioButtonGroup'
import { ButtonStyled, FormStyled } from '../common/StyledElements'

SignUpPage.propTypes = {
  onSignUp: PropTypes.func,
}

export default function SignUpPage({ onSignUp }) {
  const [missingInputs, setMissingInputs] = useState([])
  let history = useHistory()

  useEffect(() => {
    document.querySelector('input').focus()
  }, [])

  return (
    <Page title="Profil erstellen">
      <FormStyled onSubmit={handleSignUp}>
        <TextInput
          labelName="Name"
          name="name"
          placeholder="Gib hier deinen Namen ein"
          maxLength={20}
          missingInputs={missingInputs}
        />
        <TextInput
          labelName="Wohnort"
          name="residence"
          placeholder="Gib hier deinen Wohnort ein"
          maxLength={50}
          missingInputs={missingInputs}
        />
        <ContainerStyled>
          Spielstärke
          <StyledParagraph>
            Schätze deine Spielstärke auf einer Skala von 1 (Blinge) bis 5
            (Profi) ein.
          </StyledParagraph>
          <RadioButtonGroup
            name="abilityLeft"
            missingInputs={missingInputs}
          ></RadioButtonGroup>
          <RadioButtonGroup
            name="abilityRight"
            missingInputs={missingInputs}
          ></RadioButtonGroup>
        </ContainerStyled>
        <TextInput
          labelName="Bild per URL einfügen (optional)"
          name="imageURL"
          placeholder="Gib hier die URL deines Bildes ein"
        />
        <TextInput
          labelName="E-Mail"
          name="email"
          type="email"
          placeholder="Gib hier deine E-Mail-Adresse ein"
          missingInputs={missingInputs}
        />
        <TextInput
          labelName="Passwort"
          name="password"
          type="password"
          placeholder="Gib hier ein Passwort ein"
          missingInputs={missingInputs}
        />
        <ButtonStyled>Profil Erstellen</ButtonStyled>
      </FormStyled>
    </Page>
  )

  function handleSignUp(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const newUser = Object.fromEntries(formData)
    if (newUser.imageURL === '') {
      newUser.imageURL =
        'https://farm9.staticflickr.com/8494/8334907268_ffacd64d3f.jpg'
    }
    signUp(newUser)
      .then(newUser => {
        console.log(newUser)
        onSignUp(newUser)
        form.reset()
        history.push('/users')
      })
      .catch(err => {
        console.error(err)
        setMissingInputs(Object.keys(err.errors))
      })
  }
}

const ContainerStyled = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 20px;
  font-weight: bold;
`

const StyledParagraph = styled.p`
  font-size: 14px;
  font-weight: normal;
  margin: 0;
`
