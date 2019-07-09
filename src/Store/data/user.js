import { createSlice } from 'redux-starter-kit'
import { wipeData, updateData } from './actions'

// INITIAL STATE
const initialState = {}

const { reducer, selectors } = createSlice({
  slice: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [wipeData]: () => initialState,
    [updateData]: (state, { payload }) => {
      const users = payload.country
      if (users) {
        users.forEach(item => {
          state[item.id] = item
        })
      }
    },
  },
})

// REDUCER
export default reducer

// SELECTORS
export const { getUsers } = selectors
export const getUser = (state, id) => getUsers(state)[id]
export const getRootUser = state => {
  const users = getUsers(state)
  for (const id in users) {
    if (!users[id].parent) return users[id]
  }
}
