class DeleteProductController {
  constructor (useCase) {
    this.useCase = useCase
  }

  async execute (req, res) {
    const deleteProductDTO = {
      customerId: req.body.customer_id,
      productName: req.body.product_name,
      domain: req.body.domain
    }

    await this.useCase.execute(deleteProductDTO)

    res.status(200).json({ message: 'Product deleted!' })
  }
}

module.exports = DeleteProductController
