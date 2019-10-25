import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { getUserById, getMessages } from '../utils/services'

export default function ChannelPreview({ channel, currentUser }) {
  const [chatPartner, setChatPartner] = useState([])
  const [lastMessage, setLastMessage] = useState('')

  useEffect(() => {
    const chatPartnerId = channel.members.filter(
      member => member !== currentUser._id
    )
    getUserById(chatPartnerId)
      .then(user => setChatPartner(user))
      .catch(err => console.error(err))

    getMessages(channel._id)
      .then(messages => {
        let lastMsg = messages[messages.length - 1]
        lastMsg || (lastMsg = '')
        setLastMessage(lastMsg)
      })
      .catch()
  }, [currentUser._id, channel])

  return (
    <ChannelPreviewStyled>
      <PartnerImageStyled src={chatPartner.imageURL} />
      <PartnerNameStyled>{chatPartner.name}</PartnerNameStyled>
      <LassMessageStyled>{lastMessage.body}</LassMessageStyled>
    </ChannelPreviewStyled>
  )
}

const ChannelPreviewStyled = styled.li`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 60px auto;
  grid-template-areas:
    'image name'
    'image message';
  grid-row-gap: 10px;
  padding: 10px;
  background-color: var(--iceBlue);
`

const PartnerImageStyled = styled.img`
  grid-area: image;
  object-fit: cover;
  border-radius: 75px 75px 55.5px 55.5px;
  height: 48px;
  width: 48px;
`

const PartnerNameStyled = styled.h3`
  grid-area: name;
  margin: 0;
`

const LassMessageStyled = styled.div`
  grid-area: message;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 68vw;
  font-size: 14px;
`
