const ListScheduledEmailsController = require('../../../src/useCases/listScheduledEmails/listScheduledEmailsController.js')

describe('List Scheduled Emails Controller unit test', () => {
  test('It should return ok', async () => {
    // Mock express response object for spying purpose
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    // Express request
    const req = {}

    // Mock Use Case where business logic is located
    const useCase = {
      execute: jest.fn().mockReturnValue([
        { customerId: 'Cust2345', productName: 'hosting', domain: 'plugh.com', emailDate: '2021-03-27' },
        { customerId: 'Cust1234', productName: 'domain', domain: 'xyzzy.com', emailDate: '2022-01-07' },
        { customerId: 'Cust3456', productName: 'pdomain', domain: 'abcdefg.net', emailDate: '2022-03-21' },
        { customerId: 'Cust2345', productName: 'hosting', domain: 'plugh.com', emailDate: '2022-03-24' },
        { customerId: 'Cust3456', productName: 'pdomain', domain: 'abcdefg.net', emailDate: '2022-03-28' }
      ])
    }

    const controller = new ListScheduledEmailsController({ useCase })

    await controller.execute(req, res)

    // Expect use case to have been called
    expect(useCase.execute).toHaveBeenCalledTimes(1)

    // Expect response status 200
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)

    // Expect response body to be an array of scheduled emails DTOs
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
      { customer_id: 'Cust2345', product_name: 'hosting', domain: 'plugh.com', email_date: '2021-03-27' },
      { customer_id: 'Cust1234', product_name: 'domain', domain: 'xyzzy.com', email_date: '2022-01-07' },
      { customer_id: 'Cust3456', product_name: 'pdomain', domain: 'abcdefg.net', email_date: '2022-03-21' },
      { customer_id: 'Cust2345', product_name: 'hosting', domain: 'plugh.com', email_date: '2022-03-24' },
      { customer_id: 'Cust3456', product_name: 'pdomain', domain: 'abcdefg.net', email_date: '2022-03-28' }
    ]))
  })
})
