import React from 'react'
import CheckboxGroup from './CheckboxGroup'

export default {
  title: 'Checkbox Group',
  decorators: [Wrapper],
}

function Wrapper(storyFn) {
  return (
    <div style={{ width: '375px', background: '#eee', padding: '10px' }}>
      {storyFn()}
    </div>
  )
}

export const checkboxGroup = () => (
  <CheckboxGroup activeCheckboxes={['1', '3']} />
)
