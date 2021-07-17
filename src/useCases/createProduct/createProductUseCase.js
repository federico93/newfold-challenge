const ProductFactory = require('../../models/productFactory.js')

class CreateProductUseCase {
  constructor (productRepository) {
    this.productRepository = productRepository
  }

  async execute (productDTO) {
    const product = ProductFactory.createProduct(
      productDTO.customerId,
      productDTO.productName,
      productDTO.domain,
      productDTO.startDate,
      productDTO.durationMonths
    )

    return await this.productRepository.create(product)
  }
}

module.exports = CreateProductUseCase
