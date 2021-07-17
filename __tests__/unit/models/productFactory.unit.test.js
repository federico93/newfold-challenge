const ProductFactory = require('../../../src/models/productFactory.js')

describe('ProductFactory unit test', () => {
  test('It should throw unknown product error', () => {
    expect(() => {
      ProductFactory.createProduct('Cust123', 'invalid_product_name', 'xyzzy.com', '2020-01-01', 12)
    }).toThrow('unknown product')
  })
})
