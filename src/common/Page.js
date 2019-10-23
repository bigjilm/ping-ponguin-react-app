import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Header from './Header'
import Navigation from './Navigation'

Page.propTypes = {
  title: PropTypes.string,
  home: PropTypes.bool,
  mainPadding: PropTypes.string,
  chatPartnerImage: PropTypes.string,
  showFilterSymbol: PropTypes.bool,
  isFilterVisible: PropTypes.bool,
  onFilterClick: PropTypes.func,
  children: PropTypes.node,
  showNavigation: PropTypes.bool,
}

export default function Page({
  title,
  home = false,
  mainPadding = '30px',
  chatPartnerImage,
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
        chatPartnerImage={chatPartnerImage}
        showFilterSymbol={showFilterSymbol}
        isFilterVisible={isFilterVisible}
        onFilterClick={onFilterClick}
      />
      <MainStyled mainPadding={mainPadding}>{children}</MainStyled>
      {showNavigation && <Navigation />}
    </PageStyled>
  )
}

const PageStyled = styled.div`
  display: grid;
  grid-template-rows: ${props =>
    props.showNavigation ? '48px auto 48px' : '48px auto'};
  overflow: auto;
  height: 100%;
  background-color: var(--skyBlue);
`

const MainStyled = styled.main`
  overflow: auto;
  padding: ${props => props.mainPadding};
`
