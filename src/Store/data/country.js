import { createSlice } from 'redux-starter-kit'
import { wipeData, updateData } from './actions'

// INITIAL STATE
const initialState = {}

const { reducer, selectors } = createSlice({
  slice: 'countries',
  initialState,
  reducers: {},
  extraReducers: {
    [wipeData]: () => initialState,
    [updateData]: (state, { payload }) => {
      const countries = payload.country
      if (countries) {
        countries.forEach(item => {
          state[item.id] = item
        })
      }
    },
  },
})

// REDUCER
export default reducer

// SELECTORS
export const { getCountries } = selectors
export const getCountry = (state, id) => getCountries(state)[id]
