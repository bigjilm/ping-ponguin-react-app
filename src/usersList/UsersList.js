import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import UserCard from './UserCard'

UsersList.propTypes = {
  users: PropTypes.array,
  onListClick: PropTypes.func,
}

export default function UsersList({ users, onListClick }) {
  return (
    <UsersListStyled onClick={onListClick}>
      {users.map(user => (
        <UserCard key={user._id} {...user}></UserCard>
      ))}
    </UsersListStyled>
  )
}

const UsersListStyled = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 10px;
  overflow-y: auto;
  scroll-behavior: smooth;
  background-color: #418ab3;
  padding: 10px;
`
