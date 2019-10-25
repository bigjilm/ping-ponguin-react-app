import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { getChannels, getUserById } from '../utils/services'
import ChannelPreview from './ChannelPreview'

export default function ChatList({ currentUser }) {
  const [userChannels, setUserChannels] = useState([])

  useEffect(() => {
    getChannels(currentUser._id)
      .then(channels => {
        setUserChannels(channels)
      })
      .catch(err => console.error(err))
  }, [currentUser._id])

  return (
    <ChatListStyled>
      {userChannels.map(channel => (
        <ChannelPreview
          key={channel._id}
          channel={channel}
          currentUser={currentUser}
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
