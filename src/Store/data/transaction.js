import { createSlice, createSelector } from 'redux-starter-kit'
import {
  wipeData,
  updateData,
  removeSynced,
  removeSyncedReducer,
} from './actions'
import Transaction from 'dataClasses/Transaction'

// INITIAL STATE
const initialState = { server: {}, diff: {} }

const { reducer, actions, selectors } = createSlice({
  slice: 'transactions',
  initialState,
  reducers: {
    restoreTransaction: (state, { payload }) => {
      const ids = payload
      getTrArr(state, ids).forEach(tr => {
        state.diff[tr.id] = tr.restore()
      })
    },
    deleteTransactions: (state, { payload }) => {
      const ids = payload
      getTrArr(state, ids).forEach(tr => {
        state.diff[tr.id] = tr.delete()
      })
    },
    splitTransfer: (state, { payload }) => {
      const ids = payload
      getTrArr(state, ids).forEach(tr => {
        tr.split().forEach(splitted => {
          state.diff[splitted.id] = splitted
        })
      })
    },
  },
  extraReducers: {
    [wipeData]: () => initialState,
    [updateData]: (state, { payload }) => {
      const transactions = payload.transaction
      if (transactions) {
        transactions.forEach(item => {
          state.server[item.id] = new Transaction(item)
        })
      }
    },
    [removeSynced]: removeSyncedReducer,
  },
})

// REDUCER
export default reducer

// ACTIONS
export const { restoreTransaction, deleteTransactions, splitTransfer } = actions

// SELECTORS
export const getTransactions = createSelector(
  [selectors.getTransactions],
  ({ server, diff }) => ({ ...server, ...diff })
)
export const getTransaction = (state, id) => getTransactions(state)[id]

// HELPERS
function getTrArr({ server, diff }, ids) {
  return Array.isArray(ids)
    ? ids.map(id => diff[id] || server[id])
    : [diff[ids] || server[ids]]
}
