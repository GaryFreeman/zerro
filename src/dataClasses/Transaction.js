import DataObject from './DataObject'
import uuidv1 from 'uuid/v1'

export default class Transaction extends DataObject {
  constructor(raw) {
    const defaults = {
      id: raw.id ? raw.id : uuidv1(),
      user: '',
      date: Date.now(),

      changed: Date.now(),
      created: Date.now(),

      deleted: false,
      hold: false,
      qrCode: false,

      income: 0,
      incomeInstrument: '',
      incomeAccount: '',
      opIncome: null,
      opIncomeInstrument: null,
      incomeBankID: null,

      outcome: 0,
      outcomeInstrument: '',
      outcomeAccount: '',
      opOutcome: null,
      opOutcomeInstrument: null,
      outcomeBankID: null,

      tag: null,
      comment: null,
      payee: null,
      originalPayee: null,
      merchant: null,

      latitude: null,
      longitude: null,
      reminderMarker: null,
    }
    super({ ...defaults, ...raw })
  }

  get type() {
    return this.income && this.outcome
      ? 'transfer'
      : this.income
      ? 'income'
      : 'outcome'
  }

  duplicate(params) {
    return new Transaction({ ...this, ...params })
  }

  getRestored() {
    return this.duplicate({
      deleted: false,
      changed: Math.floor(Date.now() / 1000),
      id: uuidv1(),
    })
  }

  delete() {
    return this.duplicate({
      deleted: true,
      changed: Math.floor(Date.now() / 1000),
    })
  }

  split() {
    if (this.type !== 'transfer') return null
    return [
      this.duplicate({
        deleted: false,
        changed: Math.floor(Date.now() / 1000),
        income: 0,
        incomeInstrument: this.outcomeInstrument,
        incomeAccount: this.outcomeAccount,
        opIncome: null,
        opIncomeInstrument: null,
        incomeBankID: null,
      }),
      this.duplicate({
        deleted: false,
        changed: Math.floor(Date.now() / 1000),
        id: uuidv1(),
        outcome: 0,
        outcomeInstrument: this.incomeInstrument,
        outcomeAccount: this.incomeAccount,
        opOutcome: null,
        opOutcomeInstrument: null,
        outcomeBankID: null,
      }),
    ]
  }

  // STATIC METHODS

  static compare(by = 'DATE', ascending = false) {
    const compareFuncs = {
      DATE: (tr1, tr2) => {
        const result =
          +tr2.date === +tr1.date
            ? tr2.created - tr1.created
            : tr2.date - tr1.date
        return ascending ? -result : result
      },
      CHANGED: (tr1, tr2) =>
        ascending ? tr1.changed - tr2.changed : tr2.changed - tr1.changed,
    }
    return compareFuncs[by]
  }
}
