import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Page from '../common/Page'
import Filter from './Filter'
import UsersList from './UsersList'

UsersListPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
}

export default function UsersListPage({ users }) {
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

  return (
    <Page
      title="ping ponguin"
      showFilterSymbol={true}
      isFilterVisible={isFilterVisible}
      onFilterClick={handleFilterClick}
    >
      {isFilterVisible && (
        <Filter
          residenceFilterValue={residenceFilterValue}
          onChangeResidenceFilterValue={setResidenceFilterValue}
          abilityFilterValues={abilityFilterValues}
          onChangeAbilityFilterValues={setAbilityFilterValues}
        ></Filter>
      )}
      {withUsersList(users)}
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
        user.residence === residenceFilterValue ||
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
        onListClick={handleListClick}
      />
    )
  }
}
