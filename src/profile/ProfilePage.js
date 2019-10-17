import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Route } from 'react-router-dom'
import Page from '../common/Page'
import { LoadingMessageStyled } from '../common/StyledElements'
import UserForm from './EditProfileForm'
import { getUser } from '../utils/services'
import { getFromStorage } from '../utils/storage'
import PasswordForm from './PasswordForm'
import Profile from './Profile'

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({})
  let history = useHistory()

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
        {!isLoading && (
          <>
            <Route exact path="/profile">
              <Profile
                user={user}
                onEditClick={() => history.push('/profile/edit')}
                onChangePasswordClick={() =>
                  history.push('/profile/changePassword')
                }
              />
            </Route>
            <Route exact path="/profile/edit">
              <UserForm
                user={user}
                onChange={changedProp => setUser({ ...user, ...changedProp })}
              />
            </Route>
            <Route path="/profile/changePassword">
              <PasswordForm
                userId={user._id}
                onSubmit={() => history.push('/profile')}
              />
            </Route>
          </>
        )}
      </>
    </Page>
  )
}
