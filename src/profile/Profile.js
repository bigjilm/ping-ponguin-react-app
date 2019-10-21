import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import RadioButtonGroupStateless from './RadioButtonGroupStateless'
import { Cushion, ButtonStyled } from '../common/StyledElements'
import { logout } from '../utils/services'
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
        <ButtonStyled onClick={handleLogout}>Logout</ButtonStyled>
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
        <RadioButtonGroupStateless
          name="abilityLeft"
          activeRadio={user.abilityLeft}
          disabled
        />
        <RadioButtonGroupStateless
          name="abilityRight"
          activeRadio={user.abilityRight}
          disabled
        />
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
  justify-content: space-evenly;
`

const PropStyled = styled.div`
  display: grid;
  grid-gap: 10px;
`

const KeyStyled = styled.h3`
  margin: 0;
`

const ValueStyled = styled.span``

const ImageStyled = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 75px 75px 55.5px 55.5px;
  object-fit: cover;
`
