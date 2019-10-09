import { configure, addDecorator } from '@storybook/react'
import React from 'react'
import styled from 'styled-components'
import GlobalStyles from '../src/common/GlobalStyles'

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.js$/), module)

const GlobalStylesDecorator = storyFn => (
  <Main>
    <GlobalStyles />
    {storyFn()}
  </Main>
)

const Main = styled.div`
  margin: 10px;
`
addDecorator(GlobalStylesDecorator)
