import React from 'react'
import styled from 'styled-components/macro'

export default function MessagesContainer({ messages }) {
  return (
    <MessagesContainerStyled>
      {messages.map(msg => (
        <MessageStyled key={msg._id}>{msg.body}</MessageStyled>
      ))}
    </MessagesContainerStyled>
  )
}

const MessagesContainerStyled = styled.div`
  overflow: auto;
`

const MessageStyled = styled.div``
