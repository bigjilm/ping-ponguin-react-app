import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import { ButtonStyled, Cushion } from '../common/StyledElements'
import { logout } from '../utils/services'
import spreadWings from '../utils/spreadWings'
import { getFromStorage, setToStorage } from '../utils/storage'

Profile.propTypes = {
  user: PropTypes.object,
  onEditClick: PropTypes.func,
  onChangePasswordClick: PropTypes.func,
}

export default function Profile({ user, onEditClick, onChangePasswordClick }) {
  let history = useHistory()

  return (
    <ProfileStyled>
      <ButtonContainerStyled>
        <ButtonStyled onClick={onEditClick}>Bearbeiten</ButtonStyled>
        <ButtonStyled onClick={handleLogout}>Ausloggen</ButtonStyled>
      </ButtonContainerStyled>
      <PropStyled>
        <ImageStyled src={user.imageURL} />
      </PropStyled>
      <PropStyled>
        <KeyStyled>Name</KeyStyled>
        <ValueStyled>{user.name}</ValueStyled>
      </PropStyled>
      <PropStyled>
        <KeyStyled>Wohnort</KeyStyled>
        <ValueStyled>{user.residence}</ValueStyled>
      </PropStyled>
      <PropStyled>
        <KeyStyled>Spielstärke</KeyStyled>
        <AbilityStyled>
          links: {spreadWings(user.abilityLeft, 'left')}
        </AbilityStyled>
        <AbilityStyled>
          rechts: {spreadWings(user.abilityRight, 'right')}
        </AbilityStyled>
      </PropStyled>
      <PropStyled>
        <KeyStyled>E-Mail-Adresse</KeyStyled>
        <ValueStyled>{user.email}</ValueStyled>
      </PropStyled>
      <PropStyled>
        <KeyStyled>Passwort</KeyStyled>
        <ButtonStyled
          style={{ justifySelf: 'start' }}
          onClick={onChangePasswordClick}
        >
          Passwort ändern
        </ButtonStyled>
      </PropStyled>
      <Cushion />
    </ProfileStyled>
  )

  function handleLogout() {
    const token = getFromStorage('pingu-session')
    logout(token)
      .then(() => {
        setToStorage('pingu-session', '')
        history.push('/')
      })
      .catch(err => console.error(err))
  }
}

const ProfileStyled = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 30px;
`

const ButtonContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const PropStyled = styled.div`
  display: grid;
  grid-gap: 10px;
`

const KeyStyled = styled.h3`
  margin: 0;
`

const ValueStyled = styled.div`
  overflow-wrap: break-word;
  width: 75vw;
`

const ImageStyled = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 75px 75px 55.5px 55.5px;
  object-fit: cover;
`

const AbilityStyled = styled.div`
  display: grid;
  grid-template-columns: 55px repeat(5, 20px);
  margin-left: 20px;
`
