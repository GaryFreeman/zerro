import uuidv1 from 'uuid/v1'

export const makeAccount = raw => ({
  // Required
  user: raw.user,
  instrument: raw.instrument,
  title: raw.title,

  // Optional
  id: raw.id || uuidv1(),
  changed: raw.changed || Date.now(),
  role: raw.role || null,
  company: raw.company || null,
  type: raw.type || 'cash', // 'cash' | 'ccard' | 'checking' | 'loan' | 'deposit' | 'emoney' | 'debt'
  syncID: raw.syncID || null,

  balance: raw.balance || 0,
  startBalance: raw.startBalance || 0,
  creditLimit: raw.creditLimit || 0,

  inBalance: raw.inBalance || false,
  savings: raw.savings || false,
  enableCorrection: raw.enableCorrection || false,
  enableSMS: raw.enableSMS || false,
  archive: raw.archive || false,
  private: raw.private || false,

  // Для счетов с типом отличных от 'loan' и 'deposit' в  этих полях можно ставить null
  capitalization: raw.capitalization || null,
  percent: raw.percent || null,
  startDate: raw.startDate || null,
  endDateOffset: raw.endDateOffset || null,
  endDateOffsetInterval: raw.endDateOffsetInterval || null,
  payoffStep: raw.payoffStep || null,
  payoffInterval: raw.payoffInterval || null,
})
