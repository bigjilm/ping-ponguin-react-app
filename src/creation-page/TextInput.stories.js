import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'
import TextInput from './TextInput'

export default {
  title: 'Text Input',
  decorators: [Wrapper],
}

function Wrapper(storyFn) {
  return (
    <div style={{ width: '375px', background: '#eee', padding: '10px' }}>
      {storyFn()}
    </div>
  )
}

export const textInput = () => <TextInput placeholder="Enter text here" />

export const textInputWithMaxLength = () => (
  <TextInput placeholder="Enter text here" maxLength={20} />
)
