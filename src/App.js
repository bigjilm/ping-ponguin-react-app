import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import useSocket from 'use-socket.io-client'
import ChatPage from './chat/ChatPage'
import SignInPage from './login/SignInPage'
import SignUpPage from './login/SignUpPage'
import ProfilePage from './profile/ProfilePage'
import SocketContext from './SocketContext'
import UsersListPage from './usersList/UsersListPage'
import { getUserBySession, verifyUserSession } from './utils/services'
import { getFromStorage } from './utils/storage'

export default function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [justSignedUp, setJustSignedUp] = useState(false)
  const [socket] = useSocket('http://localhost:3333')

  useEffect(() => {
    const token = getFromStorage('pingu-session')
    const abortController = new AbortController()
    const signal = abortController.signal
    if (token) {
      verifyUserSession(token, { signal })
        .then(res => {
          if (res.success)
            getUserBySession(token)
              .then(user => {
                setCurrentUser(user)
                setIsLoggedIn(true)
              })
              .catch(err => {
                console.error(err)
              })
        })
        .catch(err => console.error(err))
    }
    return () => abortController.abort()
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <AppStyled>
          <Switch>
            <Route exact path="/">
              <SignInPage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
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
                setIsLoggedIn={setIsLoggedIn}
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
  overflow: auto;
  height: 100%;
`
