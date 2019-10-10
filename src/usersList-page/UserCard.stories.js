import React from 'react'
import UserCard from './UserCard'

export default {
  title: 'User Card',
  decorators: [Wrapper],
}

function Wrapper(storyFn) {
  return (
    <div style={{ width: '375px', background: '#eee', padding: '10px' }}>
      {storyFn()}
    </div>
  )
}

export const UserCard = () => (
  <UserCard
    name="Ping Pong"
    residence="Nuuk"
    abilityLeft={'4'}
    abilityRight={'2'}
    imageURL="https://images.unsplash.com/photo-1551415923-a2297c7fda79?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
  ></UserCard>
)
