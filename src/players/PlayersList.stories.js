import React from 'react'
import PlayersList from './PlayersList'
import playerData from '../playerData.json'

export default {
  title: 'Players List',
  decorators: [Wrapper],
}

function Wrapper(storyFn) {
  return <div style={{ width: '375px', background: '#eee' }}>{storyFn()}</div>
}

export const playersList = () => (
  <PlayersList playerData={playerData}></PlayersList>
)
