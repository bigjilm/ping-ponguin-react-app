import PropTypes from 'prop-types'
import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import { ButtonStyled, Cushion } from '../common/StyledElements'
import { logout } from '../utils/services'
import spreadWings from '../utils/spreadWings'
import { getFromStorage, setToStorage } from '../utils/storage'

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onChangePasswordClick: PropTypes.func.isRequired,
  edited: PropTypes.bool,
}

export default function Profile({
  user,
  setIsLoggedIn,
  onEditClick,
  onChangePasswordClick,
  edited = false,
}) {
  const topOfPage = useRef(null)
  let history = useHistory()

  useEffect(() => {
    console.log(user)
    topOfPage.current.scrollIntoView()
  }, [user])

  return (
    <ProfileStyled>
      <ScrollElement ref={topOfPage} />
      <ButtonContainerStyled>
        <ButtonStyled onClick={onEditClick}>Bearbeiten</ButtonStyled>
        <ButtonStyled onClick={handleLogout}>Ausloggen</ButtonStyled>
      </ButtonContainerStyled>
      {edited && <EditMessageStyled>Erfolgreich gespeichert</EditMessageStyled>}
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
        setIsLoggedIn(false)
        history.push('/')
      })
      .catch(err => console.error(err))
  }
}

const ProfileStyled = styled.div`
  position: relative;
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 30px;
`

const ScrollElement = styled.div`
  position: absolute;
  top: -30px;
`

const ButtonContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const EditMessageStyled = styled.span`
  text-align: center;
  color: var(--iceBlue);
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
  object-fit: cover;
  border-radius: 75px 75px 55.5px 55.5px;
  height: 150px;
  width: 150px;
`

const AbilityStyled = styled.div`
  display: grid;
  grid-template-columns: 55px repeat(5, 20px);
  margin-left: 20px;
`
