import React from 'react'
import RadioButtonGroup from './RadioButtonGroup'

export default {
  title: 'Radio Button Group',
  decorators: [Wrapper],
}

function Wrapper(storyFn) {
  return (
    <div style={{ width: '375px', background: '#eee', padding: '10px' }}>
      {storyFn()}
    </div>
  )
}

export const radioButtonGroup = () => <RadioButtonGroup hand="Hand" />

export const radioButtonGroupSelected = () => (
  <RadioButtonGroup hand="Hand" activeRadio={3} />
)
