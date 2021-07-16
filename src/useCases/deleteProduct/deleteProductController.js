const BaseController = require('../../shared/controllers/baseController.js')

class DeleteProductController extends BaseController {
  async _execute (req) {
    const deleteProductDTO = {
      customerId: req.body.customer_id,
      productName: req.body.product_name,
      domain: req.body.domain
    }

    await this.useCase.execute(deleteProductDTO)

    return { message: 'Product deleted!' }
  }
}

module.exports = DeleteProductController
