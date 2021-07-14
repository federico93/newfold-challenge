const ProductMapper = require('../../mappers/productMapper.js')

class CreateProductController {
  constructor (useCase) {
    this.useCase = useCase
  }

  async execute (req, res) {
    const productDTO = {
      customerId: req.body.customer_id,
      productName: req.body.product_name,
      domain: req.body.domain,
      startDate: req.body.start_date,
      durationMonths: req.body.duration_months
    }

    const product = await this.useCase.execute(productDTO)

    res.status(200).json(ProductMapper.toDTO(product))
  }
}

module.exports = CreateProductController
