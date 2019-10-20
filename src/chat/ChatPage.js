import React, { useEffect, useState, useContext } from 'react'
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

export default function ChatPage({ currentUser }) {
  const [currentChannel, setCurrentChannel] = useState('')
  const [messages, setMessages] = useState([])
  const socket = useContext(SocketContext)

  useEffect(() => {
    socket.on(CHANNEL_SET, channel => {
      console.log('channel set to', channel)
      setCurrentChannel(channel)
    })
    return () => socket.off(CHANNEL_SET)
  }, [socket])

  useEffect(() => {
    socket.on(MESSAGE_RECEIVED, msg => {
      setMessages([...messages, msg])
    })
    return () => {
      socket.off(MESSAGE_RECEIVED)
    }
  }, [socket, messages])

  return (
    <Page title="Chat">
      <ChatContainerStyled>
        <MessagesContainer messages={messages} />
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
  }
}

const ChatContainerStyled = styled.div`
  display: grid;
  grid-template-rows: auto 48px;
  height: 100%;
  background-color: #c2d4d8;
`
