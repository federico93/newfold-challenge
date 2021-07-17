const DateHelper = require('../helpers/dateHelper.js')

class Product {
  constructor (customerId, domain, startDate, durationMonths) {
    this.customerId = customerId
    this.domain = domain
    this.startDate = startDate
    this.durationMonths = durationMonths
  }

  getCustomerId () {
    return this.customerId
  }

  getDomain () {
    return this.domain
  }

  getStartDate () {
    return this.startDate
  }

  getDurationMonths () {
    return this.durationMonths
  }

  getEmailDates () {
    const emailDates = []
    for (const offset of this._getEmailDatesOffsets()) {
      const date = offset.field === 'start_date' ? this.getStartDate() : this.getExpirationDate()

      emailDates.push(DateHelper.addDays(date, offset.days))
    }

    return emailDates
  }

  getExpirationDate () {
    return DateHelper.addMonths(this.getStartDate(), this.getDurationMonths())
  }

  getProductName () {
    throw new Error('implement in child classes')
  }

  _getEmailDatesOffsets () {
    return []
  }
}

module.exports = Product
