import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import {
  FormStyled,
  ButtonStyled,
  Cushion,
  BackButtonStyled,
  GridContainer,
} from '../common/StyledElements'
import TextInputControlled from './TextInputControlled'
import RadioButtonGroupStateless from './RadioButtonGroupStateless'
import Alert from '../common/Alert'
import { editProfile } from '../utils/services'

EditProfileForm.propTypes = {
  user: PropTypes.object,
  onChange: PropTypes.func,
}

export default function EditProfileForm({ user, onChange }) {
  const [missingInputs, setMissingInputs] = useState([])
  const [alert, setAlert] = useState('')
  let history = useHistory()

  useEffect(() => {
    document.querySelector('input').focus()
  }, [])

  return (
    <GridContainer>
      <FormStyled onSubmit={handleSubmit}>
        <TextInputControlled
          labelName="Name"
          name="name"
          value={user.name}
          placeholder="Gib hier deinen Namen ein"
          maxLength={20}
          missingInputs={missingInputs}
          onChange={onChange}
        />
        <TextInputControlled
          labelName="Wohnort"
          name="residence"
          value={user.residence}
          placeholder="Gib hier deinen Wohnort ein"
          maxLength={50}
          missingInputs={missingInputs}
          onChange={onChange}
        />
        <ContainerStyled>
          Spielstärke
          <StyledParagraph>
            Schätze deine Spielstärke auf einer Skala von 1 (Blinge) bis 5
            (Profi) ein.
          </StyledParagraph>
          <RadioButtonGroupStateless
            name="abilityLeft"
            activeRadio={user.abilityLeft}
            missingInputs={missingInputs}
            onClick={onChange}
          ></RadioButtonGroupStateless>
          <RadioButtonGroupStateless
            name="abilityRight"
            activeRadio={user.abilityRight}
            missingInputs={missingInputs}
            onClick={onChange}
          ></RadioButtonGroupStateless>
        </ContainerStyled>
        <TextInputControlled
          labelName="Bild per URL einfügen (optional)"
          name="imageURL"
          value={user.imageURL}
          placeholder="Gib hier die URL deines Bildes ein"
          onChange={onChange}
        />
        <TextInputControlled
          labelName="E-Mail"
          name="email"
          value={user.email}
          placeholder="Gib hier deine E-Mail-Adresse ein"
          missingInputs={missingInputs}
          onChange={onChange}
        />
        {alert && <Alert>{alert}</Alert>}
        <ButtonStyled>Speichern</ButtonStyled>
      </FormStyled>
      <BackButtonStyled
        onClick={() => {
          history.push('/profile')
        }}
      >
        zurück
      </BackButtonStyled>
      <Cushion />
    </GridContainer>
  )

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    editProfile(user)
      .then(res => {
        console.log(res)
        if (!res.success) {
          throw new Error(res.message)
        }
        form.reset()
        history.push('/profile')
      })
      .catch(err => {
        console.error(err)
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
