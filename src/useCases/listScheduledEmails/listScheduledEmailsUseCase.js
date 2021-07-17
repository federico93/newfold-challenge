const ScheduledEmail = require('../../models/scheduledEmail.js')

class ListScheduledEmailsUseCase {
  constructor (productRepository) {
    this.productRepository = productRepository
    this.sortedScheduledEmails = []
  }

  async execute () {
    const products = await this.productRepository.list()

    for (const product of products) {
      for (const emailDate of product.getEmailDates()) {
        this._insertScheduledEmail(new ScheduledEmail(
          product.getCustomerId(),
          product.getProductName(),
          product.getDomain(),
          emailDate
        ))
      }
    }

    return this.sortedScheduledEmails
  }

  // For simplicity I use O(n) algorithms although it could be O(log(n)) but not with javascript arrays
  _insertScheduledEmail (scheduledEmail) {
    let i = 0; let found = false
    while (i < this.sortedScheduledEmails.length && !found) {
      if (scheduledEmail.getEmailDate() < this.sortedScheduledEmails[i].getEmailDate()) {
        found = true
      } else {
        i++
      }
    }

    this.sortedScheduledEmails.splice(i, 0, scheduledEmail)
  }
}

module.exports = ListScheduledEmailsUseCase
