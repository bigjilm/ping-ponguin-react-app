import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import MessageInputForm from './MessageInputForm'
import SocketContext from '../SocketContext'
import {
  USER_CONNECTED,
  USER_DISCONNECTED,
  CHAT_START,
  CHAT_LEAVE,
  CHANNEL_SET,
  MESSAGE_SENT,
  MESSAGE_RECEIVED,
  TYPING,
} from '../events'
import MessagesContainer from './MessagesContainer'

export default function ChatPage({ currentUser }) {
  const [channel, setChannel] = useState({})
  const [messages, setMessages] = useState([])
  const socket = useContext(SocketContext)

  useEffect(() => {
    socket.on(CHANNEL_SET, channel => {
      console.log(channel)
      setChannel(channel)
    })
    socket.on(MESSAGE_RECEIVED, msg => {
      console.log(msg.channel)
      setMessages([...messages, msg])
    })
  })

  return (
    <Page title="Chat">
      <ChatContainerStyled>
        <MessagesContainer messages={messages} />
        <MessageInputForm onSubmit={sendSocketIO} />
      </ChatContainerStyled>
    </Page>
  )

  function sendSocketIO(event) {
    event.preventDefault()
    const msg = {
      body: event.currentTarget.textarea.value,
      author: currentUser._id,
      channel: channel._id,
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
