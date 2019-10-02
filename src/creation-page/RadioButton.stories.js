import React from 'react'
import RadioButton from './RadioButton'

export default {
  title: 'Radio Button',
  decorators: [Wrapper],
}

function Wrapper(storyFn) {
  return (
    <div style={{ width: '50px', background: '#eee', padding: '10px' }}>
      {storyFn()}
    </div>
  )
}

export const radioButton = () => <RadioButton value={2} />

export const radioButtonActive = () => <RadioButton value={2} activeRadio={2} />
