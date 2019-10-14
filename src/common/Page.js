import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Header from './Header'
import Navigation from './Navigation'

Page.propTypes = {
  title: PropTypes.string,
  showFilterSymbol: PropTypes.bool,
  isFilterVisible: PropTypes.bool,
  onFilterClick: PropTypes.func,
  children: PropTypes.node,
}

export default function Page({
  title,
  showFilterSymbol,
  isFilterVisible,
  onFilterClick,
  children,
}) {
  return (
    <PageStyled>
      <Header
        title={title}
        showFilterSymbol={showFilterSymbol}
        isFilterVisible={isFilterVisible}
        onFilterClick={onFilterClick}
      />
      {children}
      {/* <Navigation /> */}
    </PageStyled>
  )
}

const PageStyled = styled.main`
  display: grid;
  grid-template-rows: 48px auto;
  background-color: #418ab3;
  overflow: auto;
`
