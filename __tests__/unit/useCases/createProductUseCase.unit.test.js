const CreateProductUseCase = require('../../../src/useCases/createProduct/createProductUseCase.js')
const Domain = require('../../../src/models/domain.js')

describe('Create Product Use Case unit test', () => {
  test('It should create a product', async () => {
    const productDTO = {
      customerId: 'Cust123',
      productName: 'domain',
      domain: 'xyzzy.com',
      startDate: '2020-01-01',
      durationMonths: 12
    }

    // Mock product repository
    const productRepository = {
      create: jest.fn().mockImplementation((product) => {
        return product
      })
    }

    const useCase = new CreateProductUseCase(productRepository)

    const createdProduct = await useCase.execute(productDTO)

    // Expect output to have same attributes as input
    expect(createdProduct.getCustomerId()).toEqual(productDTO.customerId)
    expect(createdProduct.getProductName()).toEqual(productDTO.productName)
    expect(createdProduct.getDomain()).toEqual(productDTO.domain)
    expect(createdProduct.getStartDate()).toEqual(productDTO.startDate)
    expect(createdProduct.getDurationMonths()).toEqual(productDTO.durationMonths)

    expect(productRepository.create).toHaveBeenCalledTimes(1)
    expect(productRepository.create).toHaveBeenCalledWith(new Domain(
      productDTO.customerId,
      productDTO.domain,
      productDTO.startDate,
      productDTO.durationMonths
    ))
  })
})
