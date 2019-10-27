import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { getChannels } from '../utils/services'
import ChannelPreview from './ChannelPreview'

ChatList.propTypes = {
  currentUser: PropTypes.object.isRequired,
  setCurrentChannelId: PropTypes.func.isRequired,
  messages: PropTypes.array,
}

export default function ChatList({ currentUser, setCurrentChannelId, messages }) {
  const [userChannels, setUserChannels] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    getChannels(currentUser._id, { signal })
      .then(setUserChannels)
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
          setCurrentChannelId={setCurrentChannelId}
          messages={messages}
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
