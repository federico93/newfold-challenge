const DeleteProductUseCase = require('../../../src/useCases/deleteProduct/deleteProductUseCase.js')

describe('Delete Product Use Case unit test', () => {
  test('It should delete a product', async () => {
    const deleteProductDTO = {
      customerId: 'Cust123',
      productName: 'domain',
      domain: 'xyzzy.com'
    }

    // Mock product repository
    const productRepository = {
      delete: jest.fn().mockImplementation((customerId, productName, domain) => {
        return null
      })
    }

    const useCase = new DeleteProductUseCase(productRepository)

    await useCase.execute(deleteProductDTO)

    expect(productRepository.delete).toHaveBeenCalledTimes(1)
    expect(productRepository.delete).toHaveBeenCalledWith(
      deleteProductDTO.customerId,
      deleteProductDTO.productName,
      deleteProductDTO.domain
    )
  })
})
