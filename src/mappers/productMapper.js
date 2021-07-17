const ProductFactory = require('../models/productFactory.js')

module.exports = {
  toDTO: (product) => {
    return {
      customer_id: product.customerId,
      product_name: product.productName,
      domain: product.domain,
      start_date: product.startDate,
      duration_months: product.durationMonths
    }
  },

  toPersistance: (product) => {
    return {
      customer_id: product.getCustomerId(),
      product_name: product.getProductName(),
      domain: product.getDomain(),
      start_date: product.getStartDate(),
      duration_months: product.getDurationMonths()
    }
  },

  toDomain: (dbItem) => {
    return ProductFactory.createProduct(
      dbItem.customer_id,
      dbItem.product_name,
      dbItem.domain,
      dbItem.start_date,
      dbItem.duration_months
    )
  }
}
