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
      <ImageStyled src={imageURL}></ImageStyled>

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
      <ChatButtonStyled onClick={startChat}>Chat</ChatButtonStyled>
    </UserCardStyled>
  )

  function startChat() {
    socket.emit(CHAT_START, [_id, currentUser._id])
    setToStorage('pingu-partner', _id)
    history.push('/chat')
  }

  // function spreadWings(ability, side) {
  //   const abilityNumber = Number(ability)
  //   const wing = side === 'left' ? leftWing : rightWing
  //   const foo = []
  //   for (let i = 0; i < abilityNumber; i++) {
  //     foo.push(i)
  //   }
  //   return foo.map(bar => <WingStyled key={bar} src={wing} />)
  // }
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
  height: 120px;
  width: 120px;
  border-radius: 75px 75px 55.5px 55.5px;
  object-fit: cover;
`

const NameStyled = styled.span`
  grid-area: name;
  font-size: 1.5em;
  font-weight: bold;
  word-break: break-all;
`

const KeyStyled = styled.h3`
  margin: 0;
  font-size: 1rem;
`

const ValueStyled = styled.div`
  word-break: break-all;
`

const ResidenceStyled = styled.div`
  grid-area: residence;
  word-break: break-all;
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
  justify-self: center;
  align-self: center;
  width: 30px;
  height: 90px;
  background-color: var(--skyBlue);
  border: none;
  writing-mode: vertical-rl;
  text-orientation: upright;
`
