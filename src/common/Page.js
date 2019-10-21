import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Header from './Header'
import Navigation from './Navigation'

Page.propTypes = {
  title: PropTypes.string,
  home: PropTypes.bool,
  showFilterSymbol: PropTypes.bool,
  isFilterVisible: PropTypes.bool,
  onFilterClick: PropTypes.func,
  children: PropTypes.node,
  showNavigation: PropTypes.bool,
}

export default function Page({
  title,
  home = false,
  showFilterSymbol = false,
  isFilterVisible = false,
  onFilterClick,
  children,
  showNavigation = true,
}) {
  return (
    <PageStyled showNavigation={showNavigation}>
      <Header
        title={title}
        home={home}
        showFilterSymbol={showFilterSymbol}
        isFilterVisible={isFilterVisible}
        onFilterClick={onFilterClick}
      />
      <MainStyled>{children}</MainStyled>
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
  height: 100%;
`

const MainStyled = styled.main`
  padding: 30px 30px;
  overflow: auto;
`
