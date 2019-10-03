import React from 'react'
import StoryRouter from 'storybook-react-router'
import Navigation from './Navigation'

export default {
  title: 'Navigation',
  decorators: [StoryRouter(), Wrapper],
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

export const navigation = () => <Navigation />
