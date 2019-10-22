import React from 'react'
import styled from 'styled-components/macro'
import sendIcon from '../assets/send-icon.svg'

export default function MessageInputForm({ onSubmit }) {
  return (
    <MessageInputFormStyled onSubmit={onSubmit}>
      <MessageInputStyled name="textarea" />
      <SendLabelStyled>
        <IconStyled src={sendIcon} />
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

const IconStyled = styled.img`
  height: 40px;
`

const SubmitInputStyled = styled.input`
  display: none;
`
