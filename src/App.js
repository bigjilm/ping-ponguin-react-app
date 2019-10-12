import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import Navigation from './common/Navigation'
import UsersListPage from './usersListPage/UsersListPage'
import WelcomePage from './welcomePage/WelcomePage'
import { getUsers } from './utils/services'
import SignUpPage from './welcomePage/SignUpPage'
import SignInPage from './welcomePage/SignInPage'

export default function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers().then(setUsers)
  }, [])

  return (
    <Router>
      <AppStyled>
        <Switch>
          <Route exact path="/">
            <WelcomePage />
          </Route>
          <Route exact path="/signin">
            <SignInPage />
          </Route>
          <Route exact path="/signup">
            <SignUpPage onSignUp={newUser => setUsers([...users, newUser])} />
          </Route>
          <Route path="/users">
            <UsersListPage users={users} />
          </Route>
        </Switch>
        <Navigation />
      </AppStyled>
    </Router>
  )
}

const AppStyled = styled.div`
  display: grid;
  grid-template-rows: auto 48px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  overflow: auto;
`
