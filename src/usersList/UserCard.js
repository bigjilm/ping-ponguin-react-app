import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import { CHAT_START } from '../events'
import SocketContext from '../SocketContext'
import { setToStorage } from '../utils/storage'
import leftWing from '../assets/leftWing.png'
import rightWing from '../assets/rightWing.png'

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
      <ImageStyled src={imageURL}></ImageStyled>
      <ResidenceStyled>Wohnort: {residence}</ResidenceStyled>
      <div>
        Spielstärke
        <AbilityStyled>links: {plotWings(abilityLeft, 'left')}</AbilityStyled>
        <AbilityStyled>
          rechts: {plotWings(abilityRight, 'right')}
        </AbilityStyled>
      </div>
      <ChatButtonStyled onClick={startChat}>Chat</ChatButtonStyled>
    </UserCardStyled>
  )

  function startChat() {
    socket.emit(CHAT_START, [_id, currentUser._id])
    setToStorage('pingu-partner', _id)
    history.push('/chat')
  }

  function plotWings(ability, side) {
    const abilityNumber = Number(ability)
    const wing = side === 'left' ? leftWing : rightWing
    for (let i = 0; i < abilityNumber; i++) {
      return <WingStyled src={wing} />
    }
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
  background-color: var(--iceBlue);
  padding: 20px;
`

const ImageStyled = styled.img`
  grid-area: image;
  justify-self: center;
  height: 150px;
  width: 150px;
  border-radius: 75px 75px 55.5px 55.5px;
  object-fit: cover;
`

const NameStyled = styled.span`
  grid-area: name;
  font-size: 1.5em;
  font-weight: bold;
`

const ResidenceStyled = styled.span`
  grid-area: residence;
`

const AbilityStyled = styled.div`
  grid-area: ability;
  margin-left: 20px;
`

const WingStyled = styled.img`
  height: 20px;
  background-color: var(--iceBlue);
`

const ChatButtonStyled = styled.button`
  grid-area: button;
  justify-self: center;
  width: 70px;
  height: 50px;
  background-color: var(--skyBlue);
  border: none;
`
