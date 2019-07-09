import DataObject from './DataObject'

export default class User extends DataObject {
  constructor(raw) {
    const defaults = {
      id: 0, // Int
      changed: Date.now(), //Int -> Unix timestamp
      login: null, // String?
      currency: 0, // Int  -> Instrument.id
      parent: null, // Int? -> User.id
    }
    super({ ...defaults, ...raw })
  }

  // COMPUTED PROPERTIES
  get isRoot() {
    return this.parent === null
  }
}
