import React from 'react'
import styled from 'styled-components/macro'
import Header from './Header'

export default function Page({
  title,
  isFilterVisible,
  onFilterClick,
  children,
}) {
  return (
    <PageStyled>
      <Header
        title={title}
        isFilterVisible={isFilterVisible}
        onFilterClick={onFilterClick}
      />
      {children}
    </PageStyled>
  )
}

const PageStyled = styled.main`
  display: grid;
  grid-template-rows: 48px auto;
  background-color: #418ab3;
  overflow: auto;
`
