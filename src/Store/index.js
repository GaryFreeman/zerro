import { configureStore } from 'redux-starter-kit'
import ZenApi from '../services/ZenApi'
import LocalStorage from '../services/localstorage'

import data from './data'
import diff from './diff'
import filterConditions from './filterConditions'
import openedTransaction from './openedTransaction'
import token from './token'
import isPending from './isPending'
import selectedTransactions from './selectedTransactions'

export const store = configureStore({
  reducer: {
    data,
    diff,
    filterConditions,
    openedTransaction,
    selectedTransactions,
    isPending,
    token,
  },
  preloadedState: getInitialState(),
})

function getInitialState() {
  const token = ZenApi.getLocalToken()
  const data = LocalStorage.get('data')
  if (token && data) {
    return { data, token }
  }
  if (token) {
    return { token }
  }
  return
}
