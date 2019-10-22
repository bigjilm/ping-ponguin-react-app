import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import Alert from '../common/Alert'
import {
  ButtonStyled,
  BackButtonStyled,
  GridContainer,
} from '../common/StyledElements'
import TextInput from '../common/TextInput'
import { editPassword } from '../utils/services'

PasswordForm.propTypes = {
  userId: PropTypes.string,
  onSubmit: PropTypes.func,
}

export default function PasswordForm({ userId, onSubmit }) {
  const [alert, setAlert] = useState('')
  let history = useHistory()

  return (
    <GridContainer>
      <PasswordFormStyled onSubmit={handleSubmit}>
        <TextInput
          labelName="Altes Passwort"
          name="oldPassword"
          type="password"
        />
        <TextInput
          labelName="Neues Passwort"
          name="newPassword"
          type="password"
        />
        <TextInput
          labelName="Nochmal neues Passwort"
          name="newPasswordRepeat"
          type="password"
        />
        {alert && <Alert>{alert}</Alert>}
        <ButtonStyled>Speichern</ButtonStyled>
      </PasswordFormStyled>
      <BackButtonStyled
        onClick={() => {
          history.push('/profile')
        }}
      >
        zurück
      </BackButtonStyled>
    </GridContainer>
  )

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const passwordData = Object.fromEntries(formData)
    editPassword(userId, passwordData)
      .then(res => {
        if (!res.success) {
          throw new Error(res.message)
        }
        console.log(res)
        onSubmit()
      })
      .catch(err => {
        console.error(err)
        setAlert(err.message)
      })
  }
}

const PasswordFormStyled = styled.form`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 30px;
`
