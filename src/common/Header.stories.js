import React from 'react'
import Header from './Header'

export default {
  title: 'Header',
  decorators: [Wrapper],
}

function Wrapper(storyFn) {
  return (
    <div
      style={{
        display: 'grid',
        height: '48px',
        width: '375px',
        background: '#eee',
      }}
    >
      {storyFn()}
    </div>
  )
}

export const header = () => <Header title="title" />

export const headerWithFilter = () => <Header title="title" showFilterSymbol />

export const headerWithChatPartnerImage = () => (
  <Header
    title="title"
    chatPartnerImage="https://cdn1.spiegel.de/images/image-1257182-860_poster_16x9-gjyh-1257182.jpg"
  />
)
