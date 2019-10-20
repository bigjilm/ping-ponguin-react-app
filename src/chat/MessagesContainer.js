import React from 'react'
import styled from 'styled-components/macro'

export default function MessagesContainer({ messages }) {
  return (
    <MessagesContainerStyled>
      {messages.map(msg => msg.body)}
    </MessagesContainerStyled>
  )
}

const MessagesContainerStyled = styled.div``
