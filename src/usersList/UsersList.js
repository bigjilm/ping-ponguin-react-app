import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import UserCard from './UserCard'
import { Cushion } from '../common/styledElements'

UsersList.propTypes = {
  users: PropTypes.array,
  currentUser: PropTypes.object.isRequired,
  onListClick: PropTypes.func.isRequired,
}

export default function UsersList({ users = [], currentUser, onListClick }) {
  return (
    <UsersListStyled onClick={onListClick}>
      {users.map(user => (
        <UserCard key={user._id} {...user} currentUser={currentUser}></UserCard>
      ))}
      <Cushion />
    </UsersListStyled>
  )
}

const UsersListStyled = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 30px;
  overflow-y: auto;
  scroll-behavior: smooth;
`
