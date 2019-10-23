import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import useSocket from 'use-socket.io-client'
import SocketContext from './SocketContext'
import ChatPage from './chat/ChatPage'
import SignInPage from './login/SignInPage'
import SignUpPage from './login/SignUpPage'
import WelcomePage from './login/WelcomePage'
import ProfilePage from './profile/ProfilePage'
import UsersListPage from './usersList/UsersListPage'
import { getFromStorage } from './utils/storage'
import { getUser, verifyUserSession } from './utils/services'

export default function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [justSignedUp, setJustSignedUp] = useState(false)
  const [socket] = useSocket('http://localhost:3333')
  const token = getFromStorage('pingu-session')

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    if (token) {
      verifyUserSession(token, { signal })
        .then(res => {
          if (res.success)
            getUser(token)
              .then(user => {
                setCurrentUser(user)
              })
              .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
    }
    return () => abortController.abort()
  }, [token])

  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <AppStyled>
          <Switch>
            <Route exact path="/">
              <WelcomePage />
            </Route>
            <Route exact path="/signin">
              <SignInPage
                setCurrentUser={setCurrentUser}
                justSignedUp={justSignedUp}
                setJustSignedUp={setJustSignedUp}
              />
            </Route>
            <Route exact path="/signup">
              <SignUpPage setJustSignedUp={setJustSignedUp} />
            </Route>
            <Route exact path="/users">
              <UsersListPage currentUser={currentUser} />
            </Route>
            <Route exact path="/chat">
              <ChatPage currentUser={currentUser} />
            </Route>
            <Route path="/profile">
              <ProfilePage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            </Route>
          </Switch>
        </AppStyled>
      </Router>
    </SocketContext.Provider>
  )
}

const AppStyled = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  overflow: auto;
`
