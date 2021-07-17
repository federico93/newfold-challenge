const Product = require('./product.js')

class PDomain extends Product {
  getProductName () {
    return 'pdomain'
  }

  _getEmailDatesOffsets () {
    return [{ days: -9, field: 'expiration_date' }, { days: -2, field: 'expiration_date' }]
  }
}

module.exports = PDomain
