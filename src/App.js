import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import Navigation from './common/Navigation'
import CreationPage from './creationPage/CreationPage'
import UsersListPage from './usersListPage/UsersListPage'
import { getUsers } from './services'

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
            <UsersListPage users={users} />
          </Route>
          <Route path="/profile">
            <CreationPage onSubmit={handleSubmit}></CreationPage>
          </Route>
        </Switch>
        <Navigation />
      </AppStyled>
    </Router>
  )

  function handleSubmit(newUser) {
    setUsers([...users, newUser])
  }
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
