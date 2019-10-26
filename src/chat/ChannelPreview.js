import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { getUserById, getMessages } from '../utils/services'
import SocketContext from '../SocketContext'
import { setToStorage } from '../utils/storage'
import { CHAT_START } from '../events'

ChannelPreview.propTypes = {
  channel: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  setCurrentChannel: PropTypes.func.isRequired,
}

export default function ChannelPreview({
  channel,
  currentUser,
  setCurrentChannel,
}) {
  const [chatPartner, setChatPartner] = useState({})
  const [lastMessage, setLastMessage] = useState('')
  const socket = useContext(SocketContext)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const chatPartnerId = channel.members.filter(
      member => member !== currentUser._id
    )[0]

    if (chatPartnerId) {
      getUserById(chatPartnerId, { signal })
        .then(setChatPartner)
        .catch(err => console.error(err))
    } else {
      setChatPartner({ name: 'Dieses Konto wurde gelöscht' })
    }

    getMessages(channel._id, { signal })
      .then(messages => {
        let lastMsg = messages[messages.length - 1]
        lastMsg || (lastMsg = '')
        setLastMessage(lastMsg)
      })
      .catch(err => console.error(err))

    return () => abortController.abort()
  }, [currentUser._id, channel])

  return lastMessage ? (
    <ChannelPreviewStyled onClick={handleClick}>
      <PartnerImageStyled src={chatPartner.imageURL} />
      <PartnerNameStyled chatPartner={chatPartner}>
        {chatPartner.name}
      </PartnerNameStyled>
      <LastMessageStyled>{lastMessage.body}</LastMessageStyled>
    </ChannelPreviewStyled>
  ) : null

  function handleClick() {
    socket.emit(CHAT_START, [chatPartner._id, currentUser._id])
    setToStorage('pingu-partner', chatPartner._id)
    setCurrentChannel(channel._id)
  }
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
  user-select: none;
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
  font-size: ${props => !props.chatPartner._id && '14px'};
  font-weight: ${props => !props.chatPartner._id && 'normal'};
  font-style: ${props => !props.chatPartner._id && 'italic'};
`

const LastMessageStyled = styled.span`
  grid-area: message;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 68vw;
  font-size: 14px;
`
