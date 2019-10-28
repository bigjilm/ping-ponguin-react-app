import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import { ButtonStyled, FormStyled } from '../common/styledElements'
import TextInput from '../common/TextInput'
import { deleteUser } from '../utils/services'

export default function ConfirmDeleteForm({ userId }) {
  let history = useHistory()
  return (
    <FormStyled>
      <span>
        Zur Bestätigung, dass dein Konto gelöscht werden soll, gib bitte dein
        Passwort ein.
      </span>
      <TextInput labelName="Passwort" />
      <ButtonStyled onClick={handleDelete}>Konto löschen</ButtonStyled>
    </FormStyled>
  )

  function handleDelete() {
    deleteUser(userId)
      .then(() => {
        history.push('/')
      })
      .catch(console.error)
  }
}

const ConfirmDeleteFormStyled = styled.form``
