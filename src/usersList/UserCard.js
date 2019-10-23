import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import { CHAT_START } from '../events'
import SocketContext from '../SocketContext'
import { setToStorage } from '../utils/storage'
import spreadWings from '../utils/spreadWings'

UserCard.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  residence: PropTypes.string,
  abilityLeft: PropTypes.string,
  abilityRight: PropTypes.string,
  imageURL: PropTypes.string,
  currentUser: PropTypes.object,
}

export default function UserCard({
  _id,
  name,
  residence,
  abilityLeft,
  abilityRight,
  imageURL,
  currentUser,
}) {
  const socket = useContext(SocketContext)
  let history = useHistory()

  return (
    <UserCardStyled>
      <NameStyled>{name}</NameStyled>
      <ImageStyled src={imageURL} />
      <ResidenceStyled>
        <KeyStyled>Wohnort:</KeyStyled>
        <ValueStyled>{residence}</ValueStyled>
      </ResidenceStyled>
      <AbilityContainerStyled>
        <KeyStyled>Spielstärke</KeyStyled>
        <AbilityStyled>links: {spreadWings(abilityLeft, 'left')}</AbilityStyled>
        <AbilityStyled>
          rechts: {spreadWings(abilityRight, 'right')}
        </AbilityStyled>
      </AbilityContainerStyled>
      <ChatButtonStyled onClick={startChat}>
        <ButtonTextStyled>Chat</ButtonTextStyled>
      </ChatButtonStyled>
    </UserCardStyled>
  )

  function startChat() {
    socket.emit(CHAT_START, [_id, currentUser._id])
    setToStorage('pingu-partner', _id)
    history.push('/chat')
  }
}

const UserCardStyled = styled.section`
  display: grid;
  grid-template-rows: auto auto auto;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'name image'
    'residence image'
    'ability button';
  grid-gap: 10px;
  padding: 20px;
  background-color: var(--iceBlue);
`

const ImageStyled = styled.img`
  grid-area: image;
  justify-self: center;
  object-fit: cover;
  height: 120px;
  width: 120px;
  border-radius: 75px 75px 55.5px 55.5px;
`

const NameStyled = styled.span`
  grid-area: name;
  overflow-wrap: break-word;
  width: 40vw;
  font-size: 1.5em;
  font-weight: bold;
`

const KeyStyled = styled.h3`
  margin: 0;
  font-size: 1rem;
`

const ValueStyled = styled.div``

const ResidenceStyled = styled.div`
  grid-area: residence;
  overflow-wrap: break-word;
  width: 40vw;
`

const AbilityContainerStyled = styled.div`
  grid-area: ability;
  display: grid;
  grid-gap: 5px;
  grid-auto-rows: min-content;
`

const AbilityStyled = styled.div`
  display: grid;
  grid-template-columns: 55px repeat(5, 20px);
  margin-left: 20px;
`

const ChatButtonStyled = styled.button`
  grid-area: button;
  display: grid;
  place-items: center;
  justify-self: center;
  border: none;
  padding: 5px;
  background-color: var(--skyBlue);
`

//fix: Button tag in Chrome does not support writing mode
const ButtonTextStyled = styled.p`
  margin: 0;
  writing-mode: vertical-rl;
  text-orientation: upright;
`
