import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
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
  const [missingInputs, setMissingInputs] = useState([])
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
    if (newPlayer.imageURL === '') {
      newPlayer.imageURL =
        'https://images.unsplash.com/photo-1481399319277-1289301d7c31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60'
    }
    postPlayer(newPlayer)
      .then(res => {
        onSubmit(res)
        form.reset()
        history.push('/')
      })
      .catch(err => handleIncompleteSubmit(err))
  }

  function handleIncompleteSubmit(err) {
    setMissingInputs(Object.keys(err.errors))
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
