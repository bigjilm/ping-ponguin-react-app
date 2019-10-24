import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { SendPlane2 } from 'styled-icons/remix-line/'

MessageInputForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default function MessageInputForm({ onSubmit }) {
  useEffect(() => {
    document.querySelector('textarea').focus()
  })

  return (
    <MessageInputFormStyled onSubmit={onSubmit}>
      <MessageInputStyled name="textarea" />
      <SendLabelStyled>
        <SendIconStyled size="40" title="Send Button" />
        <SubmitInputStyled type="submit" />
      </SendLabelStyled>
    </MessageInputFormStyled>
  )
}

const MessageInputFormStyled = styled.form`
  display: grid;
  grid-template-columns: auto 48px;
  padding: 0 20px;
`

const MessageInputStyled = styled.textarea`
  resize: none;
  border-style: solid;
  border-color: var(--iceBlue);
  border-radius: 10px;
  padding: 5px;

  :focus {
    border-color: var(--plantGreen);
  }
`

const SendLabelStyled = styled.label`
  display: grid;
  place-items: center;
`

const SendIconStyled = styled(SendPlane2)``

const SubmitInputStyled = styled.input`
  display: none;
`
