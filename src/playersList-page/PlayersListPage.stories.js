import React from 'react'
import PlayersListPage from './PlayersListPage'
import playerData from '../playerData.json'

export default {
  title: 'Players List',
  decorators: [Wrapper],
}

function Wrapper(storyFn) {
  return <div style={{ width: '375px', background: '#eee' }}>{storyFn()}</div>
}

export const playersList = () => (
  <PlayersListPage playerData={playerData}></PlayersListPage>
)
