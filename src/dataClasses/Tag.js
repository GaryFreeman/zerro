import toArray from 'lodash/toArray'
import uuidv1 from 'uuid/v1'
import DataObject from './DataObject'
import { unsignedToRGB } from 'Utils/convertColor'
import isEmoji from 'Utils/isEmoji'

export default class Tag extends DataObject {
  constructor(raw) {
    const defaults = {
      id: raw.id ? raw.id : uuidv1(),
      changed: Date.now(),
      user: '',

      title: '',
      parent: null,
      icon: null,
      picture: null,
      color: null,

      showIncome: false,
      showOutcome: false,
      budgetIncome: false,
      budgetOutcome: false,
      required: false,
    }
    super({ ...defaults, ...raw })
  }

  // COMPUTED PROPERTIES
  get name() {
    const nameArr = toArray(this.title)
    if (isEmoji(nameArr[0])) {
      nameArr.shift()
      return nameArr.join('').trim()
    }
    return this.title
  }
  get colorInRGB() {
    return this.color ? unsignedToRGB(this.color) : null
  }
  get symbol() {
    return toArray(this.title)[0]
  }

  // METHODS

  duplicate(params) {
    return new Tag({ ...this, ...params })
  }

  // STATIC METHODS

  static getNullTag() {
    return new Tag({
      id: null,
      user: null,
      changed: 0,
      icon: null,
      budgetIncome: true,
      budgetOutcome: true,
      required: false,
      color: null,
      picture: null,
      showIncome: false,
      showOutcome: false,
      parent: null,
      title: '🤔 Без категории',
    })
  }
}
