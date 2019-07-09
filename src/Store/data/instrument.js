import { createSlice } from 'redux-starter-kit'
import { wipeData, updateData } from './actions'

// INITIAL STATE
const initialState = {}

const { reducer, selectors } = createSlice({
  slice: 'instruments',
  initialState,
  reducers: {},
  extraReducers: {
    [wipeData]: () => initialState,
    [updateData]: (state, { payload }) => {
      const instruments = payload.instrument
      if (instruments) {
        instruments.forEach(item => {
          state[item.id] = item
        })
      }
    },
  },
})

// REDUCER
export default reducer

// SELECTORS
export const { getInstruments } = selectors
export const getInstrument = (state, id) => getInstruments(state)[id]
