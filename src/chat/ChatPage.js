import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import MessageInputForm from './MessageInputForm'
import SocketContext from '../SocketContext'
import {
  USER_CONNECTED,
  USER_DISCONNECTED,
  CHAT_START,
  MESSAGE_SENT,
  MESSAGE_RECEIVED,
  TYPING,
} from '../events'

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const socket = useContext(SocketContext)

  useEffect(() => {
    socket.on(MESSAGE_RECEIVED, msg => {
      setMessages([...messages, msg])
    })
  })

  return (
    <Page title="Chat">
      <ChatContainerStyled>
        <MessagesContainerStyled>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </MessagesContainerStyled>
        <MessageInputForm onSubmit={sendSocketIO} />
      </ChatContainerStyled>
    </Page>
  )

  function sendSocketIO(event) {
    event.preventDefault()
    const message = event.currentTarget.textarea.value
    socket.emit(MESSAGE_SENT, message)
  }
}

const ChatContainerStyled = styled.div`
  display: grid;
  grid-template-rows: auto 48px;
  height: 100%;
  background-color: #c2d4d8;
`

const MessagesContainerStyled = styled.div``
