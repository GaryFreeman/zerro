import { createSlice } from 'redux-starter-kit'
import { wipeData, updateData } from './actions'

// INITIAL STATE
const initialState = {}

const { reducer, selectors } = createSlice({
  slice: 'companies',
  initialState,
  reducers: {},
  extraReducers: {
    [wipeData]: () => initialState,
    [updateData]: (state, { payload }) => {
      const companies = payload.country
      if (companies) {
        companies.forEach(item => {
          state[item.id] = item
        })
      }
    },
  },
})

// REDUCER
export default reducer

// SELECTORS
export const { getCompanies } = selectors
export const getCompany = (state, id) => getCompanies(state)[id]
