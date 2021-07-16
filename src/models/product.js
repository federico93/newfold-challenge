class Product {
  constructor (customerId, productName, domain, startDate, durationMonths) {
    this.customerId = customerId
    this.productName = productName
    this.domain = domain
    this.startDate = startDate
    this.durationMonths = durationMonths
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

  getStartDate () {
    return this.startDate
  }

  getDurationMonths () {
    return this.durationMonths
  }
}

module.exports = Product
