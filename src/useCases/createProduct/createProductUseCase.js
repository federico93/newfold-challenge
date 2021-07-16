const Product = require('../../models/product.js')

class CreateProductUseCase {
  constructor (productRepository) {
    this.productRepository = productRepository
  }

  async execute (productDTO) {
    const product = new Product(
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
