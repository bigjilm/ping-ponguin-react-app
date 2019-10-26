import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import Alert from '../common/Alert'
import Page from '../common/Page'
import {
  BackButtonStyled,
  ButtonStyled,
  Cushion,
  FormStyled,
  GridContainer,
} from '../common/styledElements'
import TextInput from '../common/TextInput'
import { signUp } from '../utils/services'
import RadioButtonGroup from './RadioButtonGroup'

SignUpPage.propTypes = {
  setJustSignedUp: PropTypes.func.isRequired,
}

export default function SignUpPage({ setJustSignedUp }) {
  const [missingInputs, setMissingInputs] = useState([])
  const [alert, setAlert] = useState('')
  let history = useHistory()

  useEffect(() => {
    document.querySelector('input').focus()
  }, [])

  return (
    <Page title="Profil erstellen" showNavigation={false}>
      <GridContainer>
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
          <AbilityContainerStyled>
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
          </AbilityContainerStyled>
          <TextInput
            labelName="Bild per URL einfügen (optional)"
            name="imageURL"
            placeholder="Gib hier die URL deines Bildes ein"
          />
          <TextInput
            labelName="E-Mail"
            name="email"
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
          {alert && <Alert>{alert}</Alert>}
          <ButtonStyled>Profil erstellen</ButtonStyled>
        </FormStyled>
        <BackButtonStyled
          onClick={() => {
            history.push('/')
          }}
        >
          zurück
        </BackButtonStyled>
        <Cushion />
      </GridContainer>
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
      .then(res => {
        console.log(res)
        if (!res.success) {
          throw new Error(res.message)
        }
        form.reset()
        setJustSignedUp(true)
        history.push('/signin')
      })
      .catch(err => {
        console.log(err.message)
        if (err.message === 'Error: account already exists') {
          setAlert('Zu dieser E-Mail-Adresse existiert bereits ein Konto')
        } else if (err.message.startsWith('User validation failed')) {
          setMissingInputs(Object.keys(err.errors))
        } else {
          console.error(err)
        }
      })
  }
}

const AbilityContainerStyled = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 20px;
  font-weight: bold;
`

const StyledParagraph = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: normal;
`
