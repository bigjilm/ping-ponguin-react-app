import React, { useState } from 'react'
import CheckboxGroup from './CheckboxGroup'

export default {
  title: 'Checkbox Group',
  decorators: [Wrapper],
}

function Wrapper(storyFn) {
  const [activeCheckboxes, setActiveCheckboxes] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    'alle',
  ])
  return (
    <div style={{ width: '375px', background: '#eee', padding: '10px' }}>
      {storyFn({ activeCheckboxes, setActiveCheckboxes })}
    </div>
  )
}

export const checkboxGroup = ({ activeCheckboxes, setActiveCheckboxes }) => (
  <CheckboxGroup
    activeCheckboxes={activeCheckboxes}
    setActiveCheckboxes={setActiveCheckboxes}
  />
)
