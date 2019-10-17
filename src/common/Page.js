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
  showNavigation: PropTypes.bool,
}

export default function Page({
  title,
  showFilterSymbol = false,
  isFilterVisible = false,
  onFilterClick,
  children,
  showNavigation = true,
}) {
  console.log(showNavigation)
  return (
    <PageStyled showNavigation>
      <Header
        title={title}
        showFilterSymbol={showFilterSymbol}
        isFilterVisible={isFilterVisible}
        onFilterClick={onFilterClick}
      />
      {children}
      {showNavigation && <Navigation />}
    </PageStyled>
  )
}

const PageStyled = styled.div`
  display: grid;
  grid-template-rows: ${props =>
    props.showNavigation ? '48px auto 48px' : '48px auto'};
  background-color: #418ab3;
  overflow: auto;
`
