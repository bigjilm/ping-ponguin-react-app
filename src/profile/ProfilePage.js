import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import { LoadingMessageStyled, ButtonStyled } from '../common/StyledElements'
import { getUser } from '../utils/services'
import { getFromStorage } from '../utils/storage'
import Profile from './Profile'
import UserForm from '../common/UserForm'

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(true)
  const [user, setUser] = useState({})

  useEffect(() => {
    const token = getFromStorage('pingu')
    getUser(token)
      .then(currentUser => {
        setUser(currentUser)
        setIsLoading(false)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <Page title="Profil">
      <>
        {isLoading && <LoadingMessageStyled>Loading...</LoadingMessageStyled>}
        {!isLoading && !isEditing && (
          <Profile user={user} onEditClick={() => setIsEditing(true)} />
        )}
        {!isLoading && isEditing && (
          <UserForm
            user={user}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
        )}
      </>
    </Page>
  )

  function handleChange(changedProp) {
    console.log(changedProp)
    setUser({ ...user, ...changedProp })
  }

  function handleSubmit() {
    setIsEditing(false)
  }
}
