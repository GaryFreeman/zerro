import startOfMonth from 'date-fns/start_of_month'
import DataObject from './DataObject'

const GLOBAL_BUDGET_ID = '00000000-0000-0000-0000-000000000000'

export default class Budget extends DataObject {
  constructor(raw) {
    const defauls = {
      user: '',
      changed: Date.now(),

      date: startOfMonth(Date.now()),
      tag: GLOBAL_BUDGET_ID,

      income: 0,
      incomeLock: false,
      outcome: 0,
      outcomeLock: false,
    }

    super({ ...defauls, ...raw })
  }

  duplicate(params) {
    return new Budget({ ...this, ...params })
  }

  get isGlobal() {
    return this.tag === GLOBAL_BUDGET_ID
  }

  setOutcome(outcome) {
    return this.duplicate({ outcome })
  }
}
