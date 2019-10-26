import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Page from '../common/Page'
import { LoadingMessageStyled } from '../common/styledElements'
import { getAllUsers } from '../utils/services'
import Filter from './Filter'
import UsersList from './UsersList'

UsersListPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
}

export default function UsersListPage({ currentUser }) {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [residenceFilterValue, setResidenceFilterValue] = useState('')
  const [abilityFilterValues, setAbilityFilterValues] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    'alle',
  ])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    getAllUsers({ signal })
      .then(users => {
        const filteredUsers = users.filter(user => user._id !== currentUser._id)
        setUsers(filteredUsers)
        setIsLoading(false)
      })
      .catch(err => console.error(err))
    return () => abortController.abort()
  }, [currentUser])

  return (
    <Page
      title="ping ponguin"
      home={true}
      mainPadding="15px"
      showFilterSymbol={true}
      isFilterVisible={isFilterVisible}
      onFilterClick={handleFilterClick}
    >
      <>
        {isFilterVisible && (
          <Filter
            residenceFilterValue={residenceFilterValue}
            onChangeResidenceFilterValue={setResidenceFilterValue}
            abilityFilterValues={abilityFilterValues}
            onChangeAbilityFilterValues={setAbilityFilterValues}
          ></Filter>
        )}
        {isLoading && <LoadingMessageStyled>Loading...</LoadingMessageStyled>}
        {isLoading || withUsersList(users)}
      </>
    </Page>
  )
  function handleFilterClick() {
    setIsFilterVisible(!isFilterVisible)
  }

  function handleListClick() {
    setIsFilterVisible(false)
  }

  function withUsersList(users) {
    const usersFilteredByResidence = users.filter(
      user =>
        user.residence
          .toLowerCase()
          .startsWith(residenceFilterValue.toLowerCase()) ||
        residenceFilterValue.length === 0
    )
    const usersFilteredByResidenceAndAbility = usersFilteredByResidence.filter(
      user =>
        abilityFilterValues.includes(user.abilityLeft) ||
        abilityFilterValues.includes(user.abilityRight)
    )
    return (
      <UsersList
        users={usersFilteredByResidenceAndAbility}
        currentUser={currentUser}
        onListClick={handleListClick}
      />
    )
  }
}
