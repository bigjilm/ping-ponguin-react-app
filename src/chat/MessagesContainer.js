import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

MessagesContainer.propTypes = {
  messages: PropTypes.array,
  currentUser: PropTypes.object,
}

export default function MessagesContainer({ messages, currentUser }) {
  return (
    <MessagesContainerStyled>
      {messages.map(msg => (
        <MessageStyled
          key={msg._id}
          author={msg.author}
          currentUser={currentUser}
        >
          <AuthorStyled>{msg.author}</AuthorStyled>
          <p>{msg.body}</p>
        </MessageStyled>
      ))}
    </MessagesContainerStyled>
  )
}

const MessagesContainerStyled = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 15px;
  overflow: auto;
  padding: 20px;
`

const MessageStyled = styled.div`
  background-color: var(--iceBlue);
  margin: ${props =>
    props.author === props.currentUser._id ? '0 0 0 15px' : '0 15px 0 0'};
  border-radius: ${props =>
    props.author === props.currentUser._id
      ? '10px 10px 0 10px'
      : '10px 10px 10px 0'};
  padding: 10px;
`

const AuthorStyled = styled.span`
  font-size: 14px;
`
