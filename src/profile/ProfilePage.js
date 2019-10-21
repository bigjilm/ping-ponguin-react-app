import React from 'react'
import { useHistory } from 'react-router'
import { Route } from 'react-router-dom'
import Page from '../common/Page'
import EditProfileForm from './EditProfileForm'
import PasswordForm from './PasswordForm'
import Profile from './Profile'

export default function ProfilePage({ currentUser, setCurrentUser }) {
  let history = useHistory()

  return (
    <Page title="Profil">
      <Route exact path="/profile">
        <Profile
          user={currentUser}
          onEditClick={() => history.push('/profile/edit')}
          onChangePasswordClick={() => history.push('/profile/changePassword')}
        />
      </Route>
      <Route exact path="/profile/edit">
        <EditProfileForm
          user={currentUser}
          onChange={changedProp =>
            setCurrentUser({ ...currentUser, ...changedProp })
          }
        />
      </Route>
      <Route path="/profile/changePassword">
        <PasswordForm
          userId={currentUser._id}
          onSubmit={() => history.push('/profile')}
        />
      </Route>
    </Page>
  )
}
