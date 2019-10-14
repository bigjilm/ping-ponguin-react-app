import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import { getUser } from '../utils/services'
import { getFromStorage } from '../utils/storage'
import RadioButtonGroup from '../login/RadioButtonGroup'
import { Cushion } from '../common/StyledElements'

export default function ProfilePage() {
  const [user, setUser] = useState({})

  useEffect(() => {
    const token = getFromStorage('pingu')
    getUser(token)
      .then(currentUser => {
        setUser(currentUser)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <Page title="Profil">
      <ProfileStyled>
        <PropStyled>
          <KeyStyled>Name:</KeyStyled>
          <ValueStyled>{user.name}</ValueStyled>
        </PropStyled>
        <PropStyled>
          <KeyStyled>Wohnort:</KeyStyled>
          <ValueStyled>{user.residence}</ValueStyled>
        </PropStyled>
        <PropStyled>
          <KeyStyled>Spielstärke:</KeyStyled>
          <RadioButtonGroup
            name="abilityLeft"
            initialActiveRadio={user.abilityLeft}
          />
          <RadioButtonGroup
            name="abilityRight"
            initialActiveRadio={user.abilityRight}
          />
        </PropStyled>
        <PropStyled>
          <KeyStyled>Bild:</KeyStyled>
          <ImageStyled src={user.imageURL} />
        </PropStyled>
        <PropStyled>
          <KeyStyled>E-Mail-Adresse:</KeyStyled>
          <ValueStyled>{user.email}</ValueStyled>
        </PropStyled>
        <PropStyled>
          <KeyStyled>Passwort</KeyStyled>
        </PropStyled>
        <Cushion />
      </ProfileStyled>
    </Page>
  )
}

const ProfileStyled = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 30px;
  padding: 50px 30px;
  overflow: auto;
`

const PropStyled = styled.div`
  display: grid;
  grid-gap: 10px;
`

const KeyStyled = styled.h3`
  margin: 0;
`

const ValueStyled = styled.span`
  background-color: #c2d4d8;
  padding: 5px;
`

const ImageStyled = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50px 50px 37px 37px;
  object-fit: cover;
`
