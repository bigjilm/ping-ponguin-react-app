import React from 'react'
import PlayerCard from './PlayerCard'

export default {
  title: 'Player Card',
  decorators: [Wrapper],
}

function Wrapper(storyFn) {
  return (
    <div style={{ width: '375px', background: '#eee', padding: '10px' }}>
      {storyFn()}
    </div>
  )
}

export const playerCard = () => (
  <PlayerCard
    name="Ping Pong"
    residence="Nuuk"
    abilityLeft={4}
    abilityRight={2}
  ></PlayerCard>
)
