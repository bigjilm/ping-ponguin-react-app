import React from 'react'
import Header from './Header'

export default {
  title: 'Header',
  decorators: [Wrapper],
}

function Wrapper(storyFn) {
  return (
    <div
      style={{
        display: 'grid',
        height: '48px',
        width: '375px',
        background: '#eee',
      }}
    >
      {storyFn()}
    </div>
  )
}

export const header = () => <Header />
