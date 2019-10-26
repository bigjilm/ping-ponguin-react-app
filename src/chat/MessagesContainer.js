import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { setSeenMessages } from '../utils/services'

MessagesContainer.propTypes = {
  messages: PropTypes.array,
  currentUser: PropTypes.object.isRequired,
}

export default function MessagesContainer({
  messages,
  currentChannelId,
  currentUser,
}) {
  const endOfMessages = useRef(null)

  useEffect(() => {
    console.log(currentChannelId)
    setSeenMessages(currentChannelId)
      .then(messages => console.log('msgs', messages))
      .catch(err => console.error('err', err))
  }, [currentChannelId])

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
  margin: ${props =>
    props.author === props.currentUser._id ? '0 0 0 25px' : '0 25px 0 0'};
  border-radius: ${props =>
    props.author === props.currentUser._id
      ? '10px 10px 0 10px'
      : '10px 10px 10px 0'};
  padding: 10px;
  background-color: ${props =>
    props.author === props.currentUser._id
      ? 'var(--plantGreen)'
      : 'var(--iceBlue)'};
`

const MessageBodyStyled = styled.p`
  overflow-wrap: break-word;
  width: 75vw;
  margin: 0;
`

const DateStyled = styled.span`
  font-size: 10px;
`

const EndOfMessagesStyled = styled.div`
  height: 10px;
`
