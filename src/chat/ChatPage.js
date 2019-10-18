import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Page from '../common/Page'
const socket = io.connect('http://localhost:3333')

export default function ChatPage() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on('message', msg => {
      setMessages([...messages, msg])
    })
  })

  return (
    <Page title="Chat">
      <form onSubmit={sendSocketIO}>
        <input name="input" type="text" />
        <button>Send Socket.io</button>
      </form>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </Page>
  )

  function sendSocketIO(event) {
    event.preventDefault()
    const message = event.currentTarget.input.value
    socket.emit('example_message', message)
  }
}