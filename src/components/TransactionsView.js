import React, { Component } from 'react'
import styled from 'styled-components'

import Header from '../containers/Header'
import TransactionList from '../containers/TransactionList'
import Filter from '../containers/Filter'
import RestoreBackup from './RestoreBackup'
import DetailsPanel from '../containers/DetailsPanel'
import BulkActions from '../containers/BulkActions'

const Body = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 48px);
  overflow: auto;
`
const Menu = styled.div`
  width: 280px;
  padding: 40px;
  flex-shrink: 0;
  /* background: rgba(0, 0, 0, 0.06); */
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`
const Content = styled.div`
  height: 100%;
  flex-grow: 1;
  min-width: 0;
`
const SidePanel = styled.div`
  width: 480px;
  overflow: auto;
  /* position: sticky;
  top: 0;
  align-self: flex-start;
  flex-shrink: 0; */
`
const StyledBulkActions = styled(BulkActions)`
  margin-top: 24px;
`

export default class TransactionsView extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Body>
          <Menu>
            <Filter />
            <RestoreBackup />
            <StyledBulkActions />
          </Menu>
          <Content>
            <TransactionList />
          </Content>
          <SidePanel>
            <DetailsPanel />
          </SidePanel>
        </Body>
      </React.Fragment>
    )
  }
}
