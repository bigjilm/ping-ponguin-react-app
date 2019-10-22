import React from 'react'
import styled from 'styled-components/macro'
import { SendPlane2 } from 'styled-icons/remix-line/'

export default function MessageInputForm({ onSubmit }) {
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

const MessageInputStyled = styled.textarea``

const SendLabelStyled = styled.label`
  display: grid;
  place-items: center;
`

const SendIconStyled = styled(SendPlane2)``

const SubmitInputStyled = styled.input`
  display: none;
`
