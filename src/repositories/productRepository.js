const { DataTypes } = require('sequelize')

const ProductMapper = require('../mappers/productMapper.js')

class ProductRepository {
  constructor (sequelize) {
    this.table = sequelize.define('product', {
      customer_id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      product_name: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      domain: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      start_date: DataTypes.DATEONLY,
      duration_months: DataTypes.INTEGER
    }, {
      timestamps: false
    })
  }

  async create (product) {
    const dbItem = await this.table.create(ProductMapper.toPersistance(product))

    return ProductMapper.toDomain(dbItem)
  }

  async delete (customerId, productName, domain) {
    const dbItem = await this.table.findOne({
      where: {
        customer_id: customerId,
        product_name: productName,
        domain: domain
      }
    })

    return dbItem.destroy()
  }

  async list () {
    const dbItems = await this.table.findAll()

    return dbItems.map((dbItem) => {
      return ProductMapper.toDomain(dbItem)
    })
  }
}

module.exports = ProductRepository
