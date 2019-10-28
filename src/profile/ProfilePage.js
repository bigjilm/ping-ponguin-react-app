import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Route } from 'react-router-dom'
import Page from '../common/Page'
import ProfileForm from './ProfileForm'
import PasswordForm from './PasswordForm'
import Profile from './Profile'
import PropTypes from 'prop-types'
import ConfirmDeleteForm from './ConfirmDeleteForm'

ProfilePage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
}

export default function ProfilePage({
  currentUser,
  setCurrentUser,
  setIsLoggedIn,
}) {
  const [edited, setEdited] = useState(false)
  let history = useHistory()

  return (
    <Page title="Profil">
      <Route exact path="/profile">
        <Profile
          user={currentUser}
          setIsLoggedIn={setIsLoggedIn}
          onEditClick={handleEditClick}
          onChangePasswordClick={handleChangePasswordClick}
          edited={edited}
        />
      </Route>
      <Route exact path="/profile/edit">
        <ProfileForm
          user={currentUser}
          onChange={changedProp =>
            setCurrentUser({ ...currentUser, ...changedProp })
          }
          setEdited={setEdited}
        />
      </Route>
      <Route path="/profile/changepassword">
        <PasswordForm userId={currentUser._id} setEdited={setEdited} />
      </Route>
      <Route path="/profile/confirmdelete">
        <ConfirmDeleteForm userId={currentUser._id} />
      </Route>
    </Page>
  )

  function handleEditClick() {
    setEdited(false)
    history.push('/profile/edit')
  }

  function handleChangePasswordClick() {
    setEdited(false)
    history.push('/profile/changepassword')
  }
}
