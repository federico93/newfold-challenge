class ScheduledEmail {
  constructor (customerId, productName, domain, emailDate) {
    this.customerId = customerId
    this.productName = productName
    this.domain = domain
    this.emailDate = emailDate
  }

  getCustomerId () {
    return this.customerId
  }

  getProductName () {
    return this.productName
  }

  getDomain () {
    return this.domain
  }

  getEmailDate () {
    return this.emailDate
  }
}

module.exports = ScheduledEmail
