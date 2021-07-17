const Product = require('./product.js')

class Hosting extends Product {
  getProductName () {
    return 'hosting'
  }

  _getEmailDatesOffsets () {
    return [{ days: 1, field: 'start_date' }, { days: -3, field: 'expiration_date' }]
  }
}

module.exports = Hosting
