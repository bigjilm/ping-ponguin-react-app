import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import { postPlayer } from '../services'
import RadioButtonGroup from './RadioButtonGroup'
import TextInput from './TextInput'

CreationPage.propTypes = {
  onSubmit: PropTypes.func,
}

export default function CreationPage({ onSubmit }) {
  let history = useHistory()

  useEffect(() => {
    document.querySelector('input').focus()
  }, [])

  return (
    <Page title="Profil erstellen">
      <FormStyled onSubmit={handleSubmit}>
        <TextInput
          labelName="Name"
          name="name"
          placeholder="Gib hier deinen Namen ein"
          maxLength={20}
        />
        <TextInput
          labelName="Wohnort"
          name="residence"
          placeholder="Gib hier deinen Wohnort ein"
          maxLength={20}
        />
        <LabelStyled>
          Spielstärke
          <StyledParagraph>
            Schätze deine Spielstärke auf einer Skala von 1 (Blinge) bis 5
            (Profi) ein.
          </StyledParagraph>
          <RadioButtonGroup name="abilityLeft"></RadioButtonGroup>
          <RadioButtonGroup name="abilityRight"></RadioButtonGroup>
        </LabelStyled>
        <TextInput
          labelName="Bild per URL einfügen"
          name="imageURL"
          placeholder="Gib hier die URL deines Bildes ein"
          type="url"
        />
        <ButtonStyled>Profil Erstellen</ButtonStyled>
      </FormStyled>
    </Page>
  )

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const newPlayer = Object.fromEntries(formData)
    postPlayer(newPlayer)
      .then(newPlayer => {
        onSubmit(newPlayer)
        form.reset()
        history.push('/')
      })
      .catch(console.error)
  }

  // function handleIncompleteSubmit(res) {
  //   res.errors.keys().includes('name') && console.log('name missing')
  // }
}

const FormStyled = styled.form`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 30px;
  padding: 20px;
  overflow: auto;
  scroll-behavior: smooth;
`

const LabelStyled = styled.label`
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
