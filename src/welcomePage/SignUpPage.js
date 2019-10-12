import React, { useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import TextInput from '../common/TextInput'
import { signUp } from '../utils/services'
import RadioButtonGroup from './RadioButtonGroup'

export default function SignUpPage() {
  const [missingInputs, setMissingInputs] = useState([])
  let history = useHistory()

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
        />
        <TextInput
          labelName="Passwort"
          name="password"
          type="password"
          placeholder="Gib hier ein Passwort ein"
        />
        <ButtonStyled>Profil Erstellen</ButtonStyled>
      </FormStyled>
    </Page>
  )

  function handleSignUp(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    signUp(data).then(res => {
      form.reset()
      console.log(res)
      //   history.push('/users')
    })
  }
}

const FormStyled = styled.form`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 30px;
  padding: 20px;
  scroll-behavior: smooth;
`

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

const ButtonStyled = styled.button`
  width: 150px;
  height: 50px;
  background-color: #c2d4d8;
  border-radius: 5px;
`
