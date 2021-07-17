const { DataTypes } = require('sequelize')

const ProductMapper = require('../mappers/productMapper.js')

class ProductRepository {
  constructor (sequelize) {
    this.table = sequelize.define('product', {
      customer_id: DataTypes.STRING,
      product_name: DataTypes.STRING,
      domain: DataTypes.STRING,
      start_date: DataTypes.DATEONLY,
      duration_months: DataTypes.INTEGER
    })
  }

  create (product) {
    const dbItem = this.table.create(ProductMapper.toPersistance(product))

    return ProductMapper.toDomain(dbItem)
  }

  delete (customerId, productName, domain) {
    const dbItem = this.table.findOne({
      where: {
        customer_id: customerId,
        product_name: productName,
        domain: domain
      }
    })

    return dbItem.destroy()
  }
}

module.exports = ProductRepository
