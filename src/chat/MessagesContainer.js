import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

MessagesContainer.propTypes = {
  messages: PropTypes.array,
  currentUser: PropTypes.object,
}

export default function MessagesContainer({ messages, currentUser }) {
  const endOfMessages = useRef(null)

  useEffect(() => {
    endOfMessages.current.scrollIntoView({ behavior: 'smooth' })
  })

  return (
    <MessagesContainerStyled>
      {messages.map(msg => (
        <MessageStyled
          key={msg._id}
          author={msg.author}
          currentUser={currentUser}
        >
          <DateStyled>{msg.timestamp}</DateStyled>
          <MessageBodyStyled>{msg.body}</MessageBodyStyled>
        </MessageStyled>
      ))}
      <EndOfMessagesStyled ref={endOfMessages}></EndOfMessagesStyled>
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
  background-color: ${props =>
    props.author === props.currentUser._id
      ? 'var(--plantGreen)'
      : 'var(--iceBlue)'};
  margin: ${props =>
    props.author === props.currentUser._id ? '0 0 0 25px' : '0 25px 0 0'};
  border-radius: ${props =>
    props.author === props.currentUser._id
      ? '10px 10px 0 10px'
      : '10px 10px 10px 0'};
  padding: 10px;
`

const MessageBodyStyled = styled.p`
  margin: 0;
  overflow-wrap: break-word;
  width: 75vw;
`

const DateStyled = styled.span`
  font-size: 10px;
`

const EndOfMessagesStyled = styled.div`
  height: 10px;
`
