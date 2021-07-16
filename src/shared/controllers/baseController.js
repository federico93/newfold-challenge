class BaseController {
  constructor (params) {
    const { useCase, validator, schema } = params

    this.useCase = useCase
    this.validator = validator
    this.schema = schema
  }

  async execute (req, res) {
    if (this.validator && this.schema && !this._isJsonValid(req.body)) {
      res.status(400).json({ message: 'invalid json' })
      return
    }

    try {
      const responseBody = await this._execute(req)

      res.status(200).json(responseBody)
    } catch (e) {
      console.log('error', e.message)

      res.status(500).json({ message: e.message })
    }
  }

  _isJsonValid (body) {
    return this.validator.validate(body, this.schema).valid
  }
}

module.exports = BaseController
