import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import UserCard from './UserCard'
import { Cushion } from '../common/StyledElements'

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
      <Cushion />
    </UsersListStyled>
  )
}

const UsersListStyled = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 20px;
  overflow-y: auto;
  scroll-behavior: smooth;
  background-color: #418ab3;
  padding: 20px;
`
