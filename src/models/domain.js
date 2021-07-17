const Product = require('./product.js')

class Domain extends Product {
  getProductName () {
    return 'domain'
  }

  _getEmailDatesOffsets () {
    return [{ days: -2, field: 'expiration_date' }]
  }
}

module.exports = Domain
