import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import MessageInputForm from './MessageInputForm'
import SocketContext from '../SocketContext'
import {
  USER_CONNECTED,
  USER_DISCONNECTED,
  CHAT_START,
  CHANNEL_SET,
  CHANNEL_LEAVE,
  MESSAGE_SENT,
  MESSAGE_RECEIVED,
  TYPING,
} from '../events'
import MessagesContainer from './MessagesContainer'

ChatPage.propTypes = {
  currentUser: PropTypes.object,
}

export default function ChatPage({ currentUser }) {
  const [currentChannel, setCurrentChannel] = useState('')
  const [messages, setMessages] = useState([])
  const socket = useContext(SocketContext)

  useEffect(() => {
    socket.on(CHANNEL_SET, ({ channel, messages }) => {
      console.log('channel set to', channel)
      setCurrentChannel(channel)
      const messagesFormatted = messages.map(msg => formatMessageDate(msg))
      setMessages(messagesFormatted)
    })
    return () => socket.off(CHANNEL_SET)
  }, [socket])

  useEffect(() => {
    socket.on(MESSAGE_RECEIVED, msg => {
      setMessages([...messages, formatMessageDate(msg)])
    })
    return () => {
      socket.off(MESSAGE_RECEIVED)
    }
  }, [socket, messages])

  return (
    <Page title="Chat" mainPadding="0">
      <ChatContainerStyled>
        <MessagesContainer messages={messages} currentUser={currentUser} />
        <MessageInputForm onSubmit={sendMessage} />
      </ChatContainerStyled>
    </Page>
  )

  function sendMessage(event) {
    event.preventDefault()
    const msg = {
      body: event.currentTarget.textarea.value,
      author: currentUser._id,
      channel: currentChannel,
    }
    socket.emit(MESSAGE_SENT, msg)
    event.currentTarget.reset()
  }

  function formatMessageDate(msg) {
    const date = new Date(msg.timestamp)
    const dateFormatted = date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
    return { ...msg, timestamp: dateFormatted }
  }
}

const ChatContainerStyled = styled.div`
  display: grid;
  grid-template-rows: auto 48px;
  height: 100%;
  background-color: var(--skyBlue);
`
