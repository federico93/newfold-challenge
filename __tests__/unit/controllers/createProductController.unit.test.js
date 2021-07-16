const { Validator } = require('jsonschema')
const path = require('path')
const fs = require('fs')

const CreateProductController = require('../../../src/useCases/createProduct/createProductController.js')

const schemaPath = path.join(__dirname, '../../../schemas/createProductSchema.json')

describe('Create Product Controller unit test', () => {
  const validator = new Validator()
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))

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

    // Mock Use Case where business logic is located
    const useCase = {
      execute: jest.fn().mockImplementation((product) => {
        return product
      })
    }

    const controller = new CreateProductController({ useCase, validator, schema })

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

  test('It should return error 500', async () => {
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

    // Mock Use Case to throw error
    const useCase = {
      execute: jest.fn().mockImplementation((product) => {
        throw new Error('failed for testing purpose')
      })
    }

    const controller = new CreateProductController({ useCase, validator, schema })

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

    // Expect response status 500
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(500)

    // Expect response body to show the error message
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'failed for testing purpose' }))
  })

  test('It should return error 400 invalid json', async () => {
    // Mock express response object for spying purpose
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    // Express request
    const req = {
      body: {
        customer_id: null,
        product_name: null,
        domain: null,
        start_date: null,
        duration_months: null
      }
    }

    // No need to mock use case as it shouldn't be called
    const useCase = null
    const controller = new CreateProductController({ useCase, validator, schema })

    await controller.execute(req, res)

    // Expect response status 400
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(400)

    // Expect response body to show the error message
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'invalid json' }))
  })
})
