import PropTypes from 'prop-types'
import React from 'react'
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
  showNavigation: PropTypes.bool,
  onFilterClick: PropTypes.func,
  setCurrentChannelId: PropTypes.func,
  children: PropTypes.node.isRequired,
}

export default function Page({
  title,
  home = false,
  mainPadding = '30px',
  chatPartnerImage,
  showFilterSymbol = false,
  isFilterVisible = false,
  showNavigation = true,
  onFilterClick,
  setCurrentChannelId,
  children,
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
      {showNavigation && <Navigation setCurrentChannelId={setCurrentChannelId} />}
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
