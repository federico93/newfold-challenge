require('dotenv').config()

const express = require('express')
const bodyparser = require('body-parser')
const Sequelize = require('sequelize')
const { Validator } = require('jsonschema')
const path = require('path')
const fs = require('fs')

const ProductRepository = require('./repositories/productRepository.js')

const CreateProductController = require('./useCases/createProduct/createProductController.js')
const CreateProductUseCase = require('./useCases/createProduct/createProductUseCase.js')
const createProductSchemaPath = path.join(__dirname, '../schemas/createProductSchema.json')

const DeleteProductController = require('./useCases/deleteProduct/deleteProductController.js')
const DeleteProductUseCase = require('./useCases/deleteProduct/deleteProductUseCase.js')
const deleteProductSchemaPath = path.join(__dirname, '../schemas/deleteProductSchema.json')

const ListScheduledEmailsController = require('./useCases/listScheduledEmails/listScheduledEmailsController.js')
const ListScheduledEmailsUseCase = require('./useCases/listScheduledEmails/listScheduledEmailsUseCase.js')

const app = express()

app.use(bodyparser.json())

const dbConnection = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_LOCAL_HOST,
  port: process.env.MYSQL_LOCAL_PORT,
  dialect: 'mysql',
  // disable logging; default: console.log
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const validator = new Validator()

const productRepository = new ProductRepository(dbConnection)

const createProductController = new CreateProductController({
  useCase: new CreateProductUseCase(productRepository),
  validator: validator,
  schema: JSON.parse(fs.readFileSync(createProductSchemaPath, 'utf8'))
})

const deleteProductController = new DeleteProductController({
  useCase: new DeleteProductUseCase(productRepository),
  validator: validator,
  schema: JSON.parse(fs.readFileSync(deleteProductSchemaPath, 'utf8'))
})

const listScheduledEmailsController = new ListScheduledEmailsController({
  useCase: new ListScheduledEmailsUseCase(productRepository)
})

app.post('/v1/products', createProductController.execute.bind(createProductController))
app.delete('/v1/products', deleteProductController.execute.bind(deleteProductController))
app.get('/v1/scheduled-emails', listScheduledEmailsController.execute.bind(listScheduledEmailsController))

app.listen(process.env.APP_PORT)
