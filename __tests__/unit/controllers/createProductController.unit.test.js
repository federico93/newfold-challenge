const CreateProductController = require('../../../src/useCases/createProduct/createProductController.js')

describe('Create Product Controller unit test', () => {
  test('It should return ok', async () => {
    // Mock express response object for spying purpose
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    // Express request
    const req = {
      body: {
        customer_id: 'Cust123',
        product_name: 'domain',
        domain: 'xyzzy.com',
        start_date: '2020-01-01',
        duration_months: 12
      }
    }

    // Mock Use Case with business logic
    const useCase = {
      execute: jest.fn().mockImplementation((product) => {
        return product
      })
    }

    const controller = new CreateProductController(useCase)

    await controller.execute(req, res)

    // Expect use case to have been called with a product DTO
    expect(useCase.execute).toHaveBeenCalledTimes(1)
    expect(useCase.execute).toHaveBeenCalledWith(expect.objectContaining({
      customerId: req.body.customer_id,
      productName: req.body.product_name,
      domain: req.body.domain,
      startDate: req.body.start_date,
      durationMonths: req.body.duration_months
    }))

    // Expect response status 200
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)

    // Expect response body to be the same received product
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      customer_id: req.body.customer_id,
      product_name: req.body.product_name,
      domain: req.body.domain,
      start_date: req.body.start_date,
      duration_months: req.body.duration_months
    }))
  })
})
