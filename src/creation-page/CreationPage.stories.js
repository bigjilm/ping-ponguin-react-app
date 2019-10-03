import React from 'react'
import StoryRouter from 'storybook-react-router'
import CreationPage from './CreationPage'

export default {
  title: 'Creation Page',
  decorators: [StoryRouter(), Wrapper],
}

function Wrapper(storyFn) {
  return <div style={{ width: '375px', background: '#eee' }}>{storyFn()}</div>
}

export const creationPage = () => <CreationPage />
