import { createSlice, createSelector } from 'redux-starter-kit'
import {
  wipeData,
  updateData,
  removeSynced,
  removeSyncedReducer,
} from './actions'
import Tag from 'dataClasses/Tag'

// INITIAL STATE
const initialState = { server: {}, diff: {} }

const { reducer, actions, selectors } = createSlice({
  slice: 'tags',
  initialState,
  reducers: {},
  extraReducers: {
    [wipeData]: () => initialState,
    [updateData]: (state, { payload }) => {
      const tags = payload.transaction
      if (tags) {
        tags.forEach(item => {
          state.server[item.id] = new Tag(item)
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
export const getTags = createSelector(
  [selectors.getTags],
  ({ server, diff }) => ({ ...server, ...diff })
)

export const getTag = (state, id) => getTags(state)[id]
