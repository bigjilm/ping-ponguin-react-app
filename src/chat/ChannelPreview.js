import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { getUserById } from '../utils/services'

export default function ChannelPreview({ channel, currentUser }) {
  const [chatPartner, setChatPartner] = useState([])

  useEffect(() => {
    const chatPartnerId = channel.members.filter(
      member => member !== currentUser._id
    )
    getUserById(chatPartnerId)
      .then(user => setChatPartner(user))
      .catch(err => console.error(err))
  }, [currentUser._id, channel])

  return <ChannelPreviewStyled>{chatPartner.name} </ChannelPreviewStyled>
}

const ChannelPreviewStyled = styled.li``
