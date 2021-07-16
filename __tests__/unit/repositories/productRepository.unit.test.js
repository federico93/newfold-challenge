const ProductRepository = require('../../../src/repositories/productRepository.js')

const Product = require('../../../src/models/product.js')

describe('ProductRepository unit test', () => {
  test('It should create a product', async () => {
    // Mock sequelize db connection
    const dbConnection = {
      define: jest.fn().mockReturnThis(),
      create: jest.fn().mockImplementation((dbItem) => {
        return dbItem
      })
    }

    const repo = new ProductRepository(dbConnection)

    const product = new Product('Cust123', 'domain', 'xyzzy.com', '2020-01-01', 12)

    const createdProduct = await repo.create(product)

    // Expect output product to equal input product
    expect(createdProduct.getCustomerId()).toEqual(product.getCustomerId())
    expect(createdProduct.getProductName()).toEqual(product.getProductName())
    expect(createdProduct.getDomain()).toEqual(product.getDomain())
    expect(createdProduct.getStartDate()).toEqual(product.getStartDate())
    expect(createdProduct.getDurationMonths()).toEqual(product.getDurationMonths())

    // Expect db connection calls
    expect(dbConnection.define).toHaveBeenCalledTimes(1)
    expect(dbConnection.define).toHaveBeenCalledWith('product', expect.objectContaining({
      customer_id: expect.anything(),
      product_name: expect.anything(),
      domain: expect.anything(),
      start_date: expect.anything(),
      duration_months: expect.anything()
    }))

    expect(dbConnection.create).toHaveBeenCalledTimes(1)
    expect(dbConnection.create).toHaveBeenCalledWith(expect.objectContaining({
      customer_id: product.getCustomerId(),
      product_name: product.getProductName(),
      domain: product.getDomain(),
      start_date: product.getStartDate(),
      duration_months: product.getDurationMonths()
    }))
  })
})
