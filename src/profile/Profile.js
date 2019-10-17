import React from 'react'
import styled from 'styled-components/macro'
import RadioButtonGroupStateless from '../common/inputs/RadioButtonGroupStateless'
import { Cushion, ButtonStyled } from '../common/StyledElements'

export default function Profile({ user, onEditClick, onChangePasswordClick }) {
  return (
    <ProfileStyled>
      <ButtonContainerStyled>
        <ButtonStyled onClick={onEditClick}>Bearbeiten</ButtonStyled>
        <ButtonStyled>Logout</ButtonStyled>
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
  /* background-color: #c2d4d8; */
  /* padding: 5px; */
`

const ImageStyled = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 75px 75px 55.5px 55.5px;
  object-fit: cover;
`
