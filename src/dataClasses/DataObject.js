import parseDate from 'date-fns/parse'
import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'

export default class DataObject {
  constructor(raw) {
    Object.keys(raw).forEach(key => {
      switch (key) {
        case 'date':
          this[key] = +parseDate(raw[key])
          break

        case 'changed':
        case 'created':
          this[key] = raw[key] * 1000
          break

        default:
          this[key] = raw[key]
          break
      }
    }, {})
  }

  toJSON() {
    Object.keys(this).reduce((obj, key) => {
      switch (key) {
        case 'date':
          obj[key] = format(this[key], 'YYYY-MM-DD', { locale: ru })
          break

        case 'changed':
        case 'created':
          obj[key] = this[key] / 1000
          break

        default:
          obj[key] = this[key]
          break
      }
      return obj
    }, {})
  }
}
