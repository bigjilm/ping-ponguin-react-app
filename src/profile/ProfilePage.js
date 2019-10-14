import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import { getUser } from '../utils/services'
import { getFromStorage } from '../utils/storage'

export default function ProfilePage() {
  const [user, setUser] = useState({})
  const token = getFromStorage('pingu')
  useEffect(() => {
    getUser(token)
      .then(user => {
        setUser(user)
      })
      .catch(err => console.error(err))
  }, [token])

  return (
    <Page title="Profil">
      <ProfileStyled>
        <ListStyled>
          <ItemStyled>
            <KeyStyled>Name:</KeyStyled>
            <ValueStyled>{user.name}</ValueStyled>
          </ItemStyled>
          <ItemStyled>
            <KeyStyled>Wohnort:</KeyStyled>
            <ValueStyled>{user.residence}</ValueStyled>
          </ItemStyled>
        </ListStyled>
      </ProfileStyled>
    </Page>
  )
}

const ProfileStyled = styled.div`
  overflow: auto;
`

const ListStyled = styled.ul`
  list-style-type: none;
`

const ItemStyled = styled.li``

const KeyStyled = styled.h3`
  margin: 0;
`

const ValueStyled = styled.span`
  font-weight: normal;
`
