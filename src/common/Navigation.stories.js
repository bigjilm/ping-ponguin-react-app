import React from 'react'
import Navigation from './Navigation'

export default {
  title: 'Navigation',
  decorators: [Wrapper],
}

function Wrapper(storyFn) {
  return <div style={{ width: '375px', background: '#eee' }}>{storyFn()}</div>
}

export const navigation = () => <Navigation />
