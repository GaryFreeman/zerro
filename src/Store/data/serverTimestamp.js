import { createSlice } from 'redux-starter-kit'
import { wipeData, updateData } from './actions'

// INITIAL STATE
const initialState = 0

const { reducer, selectors } = createSlice({
  slice: 'serverTimestamp',
  initialState,
  reducers: {},
  extraReducers: {
    [wipeData]: () => initialState,
    [updateData]: (state, { payload }) => payload.serverTimestamp,
  },
})

// REDUCER
export default reducer

// SELECTORS
export const getLastSyncTime = state =>
  selectors.getServerTimestamp(state) * 1000
