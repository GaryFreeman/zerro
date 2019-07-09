import { createAction } from 'redux-starter-kit'

export const removeSynced = createAction('data/removeSynced')
export const wipeData = createAction('data/wipeData')
export const updateData = createAction('data/updateData')

export const removeSyncedReducer = ({ diff }, { payload }) => {
  const syncStartTime = payload
  Object.keys(diff).forEach(id => {
    if (diff[id].changed < syncStartTime) {
      delete diff[id]
    }
  })
}
