import React from 'react'
import Footer from './Footer'

export default {
  title: 'Footer',
  decorators: [Wrapper],
}

function Wrapper(storyFn) {
  return <div style={{ width: '375px', background: '#eee' }}>{storyFn()}</div>
}

export const footer = () => <Footer />
