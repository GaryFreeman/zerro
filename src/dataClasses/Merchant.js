import uuidv1 from 'uuid/v1'
import DataObject from './DataObject'

export default class Merchant extends DataObject {
  constructor(raw) {
    const defaults = {
      id: raw.id ? raw.id : uuidv1(),
      changed: Date.now(),
      user: '',
      title: '',
    }
    super({ ...defaults, ...raw })
  }

  // METHODS

  duplicate(params) {
    return new Merchant({ ...this, ...params })
  }
}
