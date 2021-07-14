const DeleteProductController = require('../../../src/useCases/deleteProduct/deleteProductController.js')

describe('Delete Product Controller unit test', () => {
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
        domain: 'xyzzy.com'
      }
    }

    // Mock Use Case where business logic is located
    const useCase = {
      execute: jest.fn().mockImplementation((deleteProductDTO) => {
        return null
      })
    }

    const controller = new DeleteProductController(useCase)

    await controller.execute(req, res)

    // Expect use case to have been called with a delete product DTO
    expect(useCase.execute).toHaveBeenCalledTimes(1)
    expect(useCase.execute).toHaveBeenCalledWith(expect.objectContaining({
      customerId: req.body.customer_id,
      productName: req.body.product_name,
      domain: req.body.domain
    }))

    // Expect response status 200
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)

    // Expect response body to confirm deletion
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ message: 'Product deleted!' })
  })
})
