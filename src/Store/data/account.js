import { createSlice, createSelector } from 'redux-starter-kit'
import {
  wipeData,
  updateData,
  removeSynced,
  removeSyncedReducer,
} from './actions'
import Account from 'dataClasses/Account'

// INITIAL STATE
const initialState = { server: {}, diff: {} }

const { reducer, actions, selectors } = createSlice({
  slice: 'accounts',
  initialState,
  reducers: {},
  extraReducers: {
    [wipeData]: () => initialState,
    [updateData]: (state, { payload }) => {
      const accounts = payload.transaction
      if (accounts) {
        accounts.forEach(item => {
          state.server[item.id] = new Account(item)
        })
      }
    },
    [removeSynced]: removeSyncedReducer,
  },
})

// REDUCER
export default reducer

// ACTIONS
// export const { } = actions

// SELECTORS
export const getAccounts = createSelector(
  [selectors.getAccounts],
  ({ server, diff }) => ({ ...server, ...diff })
)

export const getAccount = (state, id) => getAccounts(state)[id]

export const getInBalance = createSelector(
  [getAccounts],
  accounts =>
    Object.keys(accounts)
      .map(id => accounts[id])
      .filter(acc => !acc.archive)
      .filter(acc => acc.inBalance)
      .sort((a, b) => b.balance - a.balance)
)

export const getOutOfBalance = createSelector(
  [getAccounts],
  accounts =>
    Object.keys(accounts)
      .map(id => accounts[id])
      .filter(acc => !acc.archive)
      .filter(acc => !acc.inBalance)
      .sort((a, b) => b.balance - a.balance)
)
