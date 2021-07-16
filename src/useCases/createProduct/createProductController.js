const BaseController = require('../../shared/controllers/baseController.js')

const ProductMapper = require('../../mappers/productMapper.js')

class CreateProductController extends BaseController {
  async _execute (req) {
    const productDTO = {
      customerId: req.body.customer_id,
      productName: req.body.product_name,
      domain: req.body.domain,
      startDate: req.body.start_date,
      durationMonths: req.body.duration_months
    }

    const product = await this.useCase.execute(productDTO)

    return ProductMapper.toDTO(product)
  }
}

module.exports = CreateProductController
