import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'
import TextInput from './TextInput'

export default {
  title: 'Text Input',
  decorators: [withKnobs, Wrapper],
}

function Wrapper(storyFn) {
  return (
    <div style={{ width: '375px', background: '#eee', padding: '10px' }}>
      {storyFn()}
    </div>
  )
}

export const textInput = () => (
  <TextInput value={text('Text', 'Enter test text')} />
)

export const textInputWithMaxLength = () => (
  <TextInput value={text('Text', 'Enter test text')} maxLength={20} />
)
