import { createSlice, createSelector } from 'redux-starter-kit'
import { getRootUser } from './user'
import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'
import {
  wipeData,
  updateData,
  removeSynced,
  removeSyncedReducer,
} from './actions'
import Budget from 'dataClasses/Budget'

// INITIAL STATE
const initialState = { server: {}, diff: {} }

const { reducer, actions, selectors } = createSlice({
  slice: 'budgets',
  initialState,
  reducers: {
    setBudget: (state, { payload }) => {
      const { outcome, month, tag, user } = payload
      const formattedMonth = format(month, 'YYYY-MM-DD')
      const id = tag + ',' + formattedMonth

      const budget = findBudget(state, id)
        ? findBudget(state, id)
        : new Budget({ user, date: formattedMonth, tag })
      state.diff[id] = budget.setOutcome(outcome)
    },
  },
  extraReducers: {
    [wipeData]: () => initialState,
    [updateData]: (state, { payload }) => {
      const budgets = payload.transaction
      if (budgets) {
        budgets.forEach(item => {
          state.server[`${item.tag},${item.date}`] = new Budget(item)
        })
      }
    },
    [removeSynced]: removeSyncedReducer,
  },
})

// REDUCER
export default reducer

// ACTIONS
const { setBudget } = actions

// THUNKS
export const setOutcomeBudget = (outcome, month, tag) => (
  dispatch,
  getState
) => {
  const user = getRootUser(getState()).id
  dispatch(setBudget({ outcome, month, tag, user }))
}

// SELECTORS
const getRawBudgets = selectors.getBudgets
export const getBudgets = createSelector(
  [getRawBudgets],
  ({ server, diff }) => ({ ...server, ...diff })
)

export const getBudget = (state, tag, date) =>
  getBudgets(state)[`${tag},${format(date, 'YYYY-MM-DD')}`]

// HELPERS
function findBudget({ server, diff }, id) {
  return diff[id] || server[id]
}
