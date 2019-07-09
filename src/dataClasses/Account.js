import DataObject from './DataObject'
import uuidv1 from 'uuid/v1'

export default class Account extends DataObject {
  constructor(raw) {
    const defaults = {
      id: raw.id ? raw.id : uuidv1(), // UUID
      user: 0, // Int  -> User.id
      changed: Date.now(),

      role: null, // Int? -> User.id?
      instrument: null, // Int? -> Instrument.id
      company: null, // Int? -> Company.id
      type: '', // ('cash' | 'ccard' | 'checking' | 'loan' | 'deposit' | 'emoney' | 'debt')
      title: '', // String
      syncID: null, // [String]?

      balance: 0, // Double?
      startBalance: 0, // Double?
      creditLimit: 0, // Double? >= 0

      inBalance: true,
      savings: false,
      enableCorrection: false,
      enableSMS: false,
      archive: false,

      //Для счетов с типом отличных от 'loan' и 'deposit' в  этих полях можно ставить null
      capitalization: null,
      percent: null, // Double >= 0 && < 100
      startDate: null, // 'yyyy-MM-dd'
      endDateOffset: null, // Int
      endDateOffsetInterval: null, // ('day' | 'week' | 'month' | 'year')
      payoffStep: null, // Int?
      payoffInterval: null, // ('month' | 'year')?
    }
    super({ ...defaults, ...raw })
  }

  // METHODS

  duplicate(params) {
    return new Account({ ...this, ...params })
  }
}
