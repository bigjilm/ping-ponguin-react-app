import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import UsersListPage from './usersList/UsersListPage'
import { getUsers } from './utils/services'
import SignInPage from './login/SignInPage'
import SignUpPage from './login/SignUpPage'
import WelcomePage from './login/WelcomePage'

export default function App() {
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
            <SignUpPage />
          </Route>
          <Route path="/users">
            <UsersListPage />
          </Route>
        </Switch>
      </AppStyled>
    </Router>
  )
}

const AppStyled = styled.div`
  display: grid;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  overflow: auto;
`
