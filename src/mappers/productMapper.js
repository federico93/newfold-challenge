module.exports = {
  toDTO: (product) => {
    return {
      customer_id: product.customerId,
      product_name: product.productName,
      domain: product.domain,
      start_date: product.startDate,
      duration_months: product.durationMonths
    }
  }
}
