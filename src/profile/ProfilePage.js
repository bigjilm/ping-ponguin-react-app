import React, { useEffect, useState } from 'react'
import Page from '../common/Page'
import { LoadingMessageStyled } from '../common/StyledElements'
import UserForm from '../common/UserForm'
import { getUser, editProfile } from '../utils/services'
import { getFromStorage } from '../utils/storage'
import Profile from './Profile'
import PasswordForm from './PasswordForm'

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(true)
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
        {!isLoading && !isEditing && !isChangingPassword && (
          <Profile
            user={user}
            onEditClick={() => setIsEditing(true)}
            onChangePasswordClick={() => setIsChangingPassword(true)}
          />
        )}
        {!isLoading && isEditing && (
          <UserForm
            user={user}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
        )}
        {!isLoading && isChangingPassword && (
          <PasswordForm
            userId={user._id}
            onSubmit={() => setIsChangingPassword(false)}
          />
        )}
      </>
    </Page>
  )

  function handleChange(changedProp) {
    setUser({ ...user, ...changedProp })
  }

  function handleSubmit() {
    editProfile(user)
      .then(res => {
        console.log(res)
        setIsEditing(false)
      })
      .catch(err => console.error(err))
  }
}
