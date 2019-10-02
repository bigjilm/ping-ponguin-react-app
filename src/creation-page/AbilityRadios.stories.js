import React from 'react'
import AbilityRadios from './AbilityRadios'

export default {
  title: 'Radio Buttons Group',
  decorators: [Wrapper],
}

function Wrapper(storyFn) {
  return (
    <div style={{ width: '375px', background: '#eee', padding: '10px' }}>
      {storyFn()}
    </div>
  )
}

export const abilityRadios = () => <AbilityRadios hand="Hand" />

export const abilityRadiosSelected = () => (
  <AbilityRadios hand="Hand" activeRadio={3} />
)
