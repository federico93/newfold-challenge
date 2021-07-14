module.exports = {
  toDTO: (scheduledEmail) => {
    return {
      customer_id: scheduledEmail.customerId,
      product_name: scheduledEmail.productName,
      domain: scheduledEmail.domain,
      email_date: scheduledEmail.emailDate
    }
  }
}
