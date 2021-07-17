const ProductRepository = require('../../../src/repositories/productRepository.js')

const Domain = require('../../../src/models/domain.js')
const PDomain = require('../../../src/models/pdomain.js')
const Hosting = require('../../../src/models/hosting.js')

describe('ProductRepository unit test', () => {
  // Mock sequelize db connection
  const mockDbConnection = () => {
    return {
      define: jest.fn().mockReturnThis(),
      create: jest.fn().mockImplementation((dbItem) => {
        return dbItem
      })
    }
  }

  test('It should create a domain product', async () => {
    const dbConnection = mockDbConnection()

    const repo = new ProductRepository(dbConnection)

    const domain = new Domain('Cust123', 'xyzzy.com', '2020-01-01', 12)

    const createdDomain = await repo.create(domain)

    // Expect output product to equal input product
    expect(createdDomain.getCustomerId()).toEqual(domain.getCustomerId())
    expect(createdDomain.getProductName()).toEqual(domain.getProductName())
    expect(createdDomain.getDomain()).toEqual(domain.getDomain())
    expect(createdDomain.getStartDate()).toEqual(domain.getStartDate())
    expect(createdDomain.getDurationMonths()).toEqual(domain.getDurationMonths())

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
      customer_id: domain.getCustomerId(),
      product_name: domain.getProductName(),
      domain: domain.getDomain(),
      start_date: domain.getStartDate(),
      duration_months: domain.getDurationMonths()
    }))
  })

  test('It should create a pdomain product', async () => {
    const dbConnection = mockDbConnection()

    const repo = new ProductRepository(dbConnection)

    const pdomain = new PDomain('Cust123', 'xyzzy.com', '2020-01-01', 12)

    const createdPDomain = await repo.create(pdomain)

    // Expect output product to equal input product
    expect(createdPDomain.getCustomerId()).toEqual(pdomain.getCustomerId())
    expect(createdPDomain.getProductName()).toEqual(pdomain.getProductName())
    expect(createdPDomain.getDomain()).toEqual(pdomain.getDomain())
    expect(createdPDomain.getStartDate()).toEqual(pdomain.getStartDate())
    expect(createdPDomain.getDurationMonths()).toEqual(pdomain.getDurationMonths())

    expect(dbConnection.create).toHaveBeenCalledTimes(1)
    expect(dbConnection.create).toHaveBeenCalledWith(expect.objectContaining({
      customer_id: pdomain.getCustomerId(),
      product_name: pdomain.getProductName(),
      domain: pdomain.getDomain(),
      start_date: pdomain.getStartDate(),
      duration_months: pdomain.getDurationMonths()
    }))
  })

  test('It should create a hosting product', async () => {
    const dbConnection = mockDbConnection()

    const repo = new ProductRepository(dbConnection)

    const hosting = new Hosting('Cust123', 'xyzzy.com', '2020-01-01', 12)

    const createdHosting = await repo.create(hosting)

    // Expect output product to equal input product
    expect(createdHosting.getCustomerId()).toEqual(hosting.getCustomerId())
    expect(createdHosting.getProductName()).toEqual(hosting.getProductName())
    expect(createdHosting.getDomain()).toEqual(hosting.getDomain())
    expect(createdHosting.getStartDate()).toEqual(hosting.getStartDate())
    expect(createdHosting.getDurationMonths()).toEqual(hosting.getDurationMonths())

    expect(dbConnection.create).toHaveBeenCalledTimes(1)
    expect(dbConnection.create).toHaveBeenCalledWith(expect.objectContaining({
      customer_id: hosting.getCustomerId(),
      product_name: hosting.getProductName(),
      domain: hosting.getDomain(),
      start_date: hosting.getStartDate(),
      duration_months: hosting.getDurationMonths()
    }))
  })

  test('It should delete a product', async () => {
    // Mock sequelize db connection
    const dbConnection = {
      define: jest.fn().mockReturnThis(),
      findOne: jest.fn().mockReturnThis(),
      destroy: jest.fn().mockReturnValue(null)
    }

    const repo = new ProductRepository(dbConnection)

    await repo.delete('Cust123', 'domain', 'xyzzy.com')

    expect(dbConnection.findOne).toHaveBeenCalledTimes(1)
    expect(dbConnection.findOne).toHaveBeenCalledWith({
      where: {
        customer_id: 'Cust123',
        product_name: 'domain',
        domain: 'xyzzy.com'
      }
    })

    expect(dbConnection.destroy).toHaveBeenCalledTimes(1)
  })
})
