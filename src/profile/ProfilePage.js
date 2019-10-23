import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Route } from 'react-router-dom'
import Page from '../common/Page'
import EditProfileForm from './EditProfileForm'
import PasswordForm from './PasswordForm'
import Profile from './Profile'

export default function ProfilePage({ currentUser, setCurrentUser }) {
  const [edited, setEdited] = useState(false)
  let history = useHistory()

  return (
    <Page title="Profil">
      <Route exact path="/profile">
        <Profile
          user={currentUser}
          onEditClick={handleEditClick}
          onChangePasswordClick={handleChangePasswordClick}
          edited={edited}
        />
      </Route>
      <Route exact path="/profile/edit">
        <EditProfileForm
          user={currentUser}
          onChange={changedProp =>
            setCurrentUser({ ...currentUser, ...changedProp })
          }
          setEdited={setEdited}
        />
      </Route>
      <Route path="/profile/changePassword">
        <PasswordForm userId={currentUser._id} setEdited={setEdited} />
      </Route>
    </Page>
  )

  function handleEditClick() {
    setEdited(false)
    history.push('/profile/edit')
  }

  function handleChangePasswordClick() {
    setEdited(false)
    history.push('/profile/changePassword')
  }
}
