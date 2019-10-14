import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import Filter from './Filter'
import UsersList from './UsersList'
import { getUsers } from '../utils/services'

export default function UsersListPage() {
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
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers().then(setUsers)
  }, [])

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
      <Cushion />
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

//Das folgende Element erzeugt einen Abstand zur Unterkante, wenn man ganz nach unten scrollt.
//Gibt es eine bessere Lösung?
const Cushion = styled.div`
  height: 20px;
`
