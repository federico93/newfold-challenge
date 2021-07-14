const ScheduledEmailMapper = require('../../mappers/scheduledEmailMapper.js')

class ListScheduledEmailsController {
  constructor (useCase) {
    this.useCase = useCase
  }

  async execute (req, res) {
    const scheduledEmails = await this.useCase.execute()

    res.status(200).json(scheduledEmails.map((scheduledEmail) => {
      return ScheduledEmailMapper.toDTO(scheduledEmail)
    }))
  }
}

module.exports = ListScheduledEmailsController
