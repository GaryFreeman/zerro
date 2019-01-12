import React from 'react'
import { check } from '../TransactionFilter/'
import { populate } from './functions'
import { getTransactions, getElement, getTags } from './selectors'
import reducer from './reducers/'

export const StoreContext = React.createContext()

export default class Store extends React.Component {
  state = {
    // DATA FROM ZENMONEY
    lastSync: 0,
    instrument: {},
    country: {},
    company: {},
    user: {},
    account: {},
    tag: {},
    budget: {},
    merchant: {},
    reminder: {},
    reminderMarker: {},
    transaction: {},

    // TOKEN
    token: null,

    // selectedTransactions: [],
    // UI
    openedTransaction: null,
    // updatingData: false,
    filterConditions: {}
    // showFirst: 200
  }

  /****************************************************************
   * METHODS
   ****************************************************************/

  // edit = (type, arr) => {
  //   const changed = {}
  //   changed[type] = arr.map(obj => {
  //     return {
  //       ...this.state[type][obj.id],
  //       ...{ tag: obj.tag, changed: Date.now() / 1000 }
  //     }
  //   })
  //   ZenApi.getData(
  //     res => {
  //       this.setState(parseData(res))
  //     },
  //     { lastSync: this.state.lastSync, changed: changed }
  //   )
  // }

  selectTransaction = id => {
    this.setState(state => {
      return { openedTransaction: id }
    })
  }

  getState = () => this.state

  dispatch = action => {
    if (typeof action === 'function') {
      action(this.dispatch, this.getState)
    } else {
      console.log('%c' + action.type, 'color: green', action.payload)

      this.setState(state => reducer(state, action))
    }
  }

  /****************************************************************
   * RENDER
   ****************************************************************/
  render() {
    const value = {
      // selectors,
      dispatch: this.dispatch,
      data: this.state,
      actions: {
        initState: this.initState,
        updateData: this.updateData,
        getElement: getElement(this.state, populate),
        getTransactions: getTransactions(this.state, populate, check),
        getTags: getTags(this.state, populate),
        updateFilter: this.updateFilter,
        edit: this.edit
      }
    }
    return (
      <StoreContext.Provider value={value}>
        {this.props.children}
      </StoreContext.Provider>
    )
  }
}
