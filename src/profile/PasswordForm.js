import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Alert from '../common/Alert'
import TextInput from '../common/TextInput'
import { ButtonStyled, FormStyled } from '../common/StyledElements'
import { editPassword } from '../utils/services'

PasswordForm.propTypes = {
  userId: PropTypes.string,
  onSubmit: PropTypes.func,
}

export default function PasswordForm({ userId, onSubmit }) {
  const [alert, setAlert] = useState('')

  return (
    <FormStyled onSubmit={handleSubmit}>
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
    </FormStyled>
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
