class DeleteProductUseCase {
  constructor (productRepository) {
    this.productRepository = productRepository
  }

  async execute (deleteProductDTO) {
    return await this.productRepository.delete(
      deleteProductDTO.customerId,
      deleteProductDTO.productName,
      deleteProductDTO.domain
    )
  }
}

module.exports = DeleteProductUseCase
