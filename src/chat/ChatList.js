import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { getChannels } from '../utils/services'
import ChannelPreview from './ChannelPreview'

export default function ChatList({ currentUser, setCurrentChannel }) {
  const [userChannels, setUserChannels] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    getChannels(currentUser._id, { signal })
      .then(channels => {
        setUserChannels(channels)
      })
      .catch(err => console.error(err))
    return () => abortController.abort()
  }, [currentUser._id])

  return (
    <ChatListStyled>
      {userChannels.map(channel => (
        <ChannelPreview
          key={channel._id}
          channel={channel}
          currentUser={currentUser}
          setCurrentChannel={setCurrentChannel}
        >
          {channel._id}
        </ChannelPreview>
      ))}
    </ChatListStyled>
  )
}

const ChatListStyled = styled.ul`
  display: grid;
  grid-gap: 10px;
  margin: 0;
  padding: 10px;
`
