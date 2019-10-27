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
} from '../common/styledElements'
import TextInputControlled from './TextInputControlled'
import RadioButtonGroupStateless from './RadioButtonGroupStateless'
import Alert from '../common/Alert'
import { editProfile } from '../utils/services'

ProfileForm.propTypes = {
  user: PropTypes.object,
  onChange: PropTypes.func,
  setEdited: PropTypes.func,
}

export default function ProfileForm({ user, onChange, setEdited }) {
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
          maxLength={20}
          missingInputs={missingInputs}
          onChange={onChange}
        />
        <TextInputControlled
          labelName="Wohnort"
          name="residence"
          value={user.residence}
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
          placeholder="z.B. https://images.com/yourimage.jpg"
          onChange={onChange}
        />
        <TextInputControlled
          labelName="E-Mail"
          name="email"
          value={user.email}
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
        if (!res.success) {
          throw new Error(res.message)
        }
        form.reset()
        setEdited(true)
        history.push('/profile')
      })
      .catch(err => {
        if (err.message.startsWith('User validation failed')) {
          setMissingInputs(Object.keys(err.errors))
        } else {
          setAlert(err.message)
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
  margin: 0;
  font-size: 14px;
  font-weight: normal;
`
