const Domain = require('./domain.js')
const PDomain = require('./pdomain.js')
const Hosting = require('./hosting.js')

module.exports = {
  createProduct: (customerId, productName, domain, startDate, durationMonths) => {
    switch (productName) {
      case 'domain':
        return new Domain(customerId, domain, startDate, durationMonths)
      case 'pdomain':
        return new PDomain(customerId, domain, startDate, durationMonths)
      case 'hosting':
        return new Hosting(customerId, domain, startDate, durationMonths)
      default:
        throw new Error('unknown product')
    }
  }
}
