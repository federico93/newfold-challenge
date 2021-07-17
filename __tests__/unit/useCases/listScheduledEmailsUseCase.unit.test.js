const ListScheduledEmailsUseCase = require('../../../src/useCases/listScheduledEmails/listScheduledEmailsUseCase.js')

const Domain = require('../../../src/models/domain.js')
const PDomain = require('../../../src/models/pdomain.js')
const Hosting = require('../../../src/models/hosting.js')

describe('List Scheduled Emails Use Case unit test', () => {
  test('It should list Scheduled emails', async () => {
    const products = [
      new Domain('Cust123', 'xyzzy.com', '2020-01-01', 3),
      new PDomain('Cust2345', 'xyzzy.com', '2020-01-01', 0),
      new Hosting('Cust2345', 'plugh.com', '2020-01-01', 9),
      new Hosting('Cust3456', 'abcdefg.net', '2022-03-28', 6)
    ]

    // Mock product repository
    const productRepository = {
      list: jest.fn().mockReturnValue(products)
    }

    const useCase = new ListScheduledEmailsUseCase(productRepository)

    const scheduledEmails = await useCase.execute()

    expect(productRepository.list).toHaveBeenCalledTimes(1)

    expect(scheduledEmails).toHaveLength(7)

    const expected = [
      { productName: 'pdomain', customerId: 'Cust2345', domain: 'xyzzy.com', date: '2019-12-23' },
      { productName: 'pdomain', customerId: 'Cust2345', domain: 'xyzzy.com', date: '2019-12-30' },
      { productName: 'hosting', customerId: 'Cust2345', domain: 'plugh.com', date: '2020-01-02' },
      { productName: 'domain', customerId: 'Cust123', domain: 'xyzzy.com', date: '2020-03-30' },
      { productName: 'hosting', customerId: 'Cust2345', domain: 'plugh.com', date: '2020-09-29' },
      { productName: 'hosting', customerId: 'Cust3456', domain: 'abcdefg.net', date: '2022-03-29' },
      { productName: 'hosting', customerId: 'Cust3456', domain: 'abcdefg.net', date: '2022-09-25' }
    ]

    for (const i in scheduledEmails) {
      expect(scheduledEmails[i].getProductName()).toEqual(expected[i].productName)
      expect(scheduledEmails[i].getCustomerId()).toEqual(expected[i].customerId)
      expect(scheduledEmails[i].getDomain()).toEqual(expected[i].domain)
      expect(scheduledEmails[i].getEmailDate()).toEqual(expected[i].date)
    }
  })
})
