import React from 'react'
import styled from 'styled-components/macro'
import RadioButtonGroup from '../login/RadioButtonGroup'
import { Cushion, ButtonStyled } from '../common/StyledElements'

export default function Profile({ user, onEditClick }) {
  return (
    <ProfileStyled>
      <ButtonContainerStyled>
        <ButtonStyled onClick={onEditClick}>Bearbeiten</ButtonStyled>
        <ButtonStyled>Logout</ButtonStyled>
      </ButtonContainerStyled>
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
  )
}

const ProfileStyled = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 30px;
  padding: 50px 30px;
  overflow: auto;
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
