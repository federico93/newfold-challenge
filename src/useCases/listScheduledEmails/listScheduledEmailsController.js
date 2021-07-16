const BaseController = require('../../shared/controllers/baseController.js')

const ScheduledEmailMapper = require('../../mappers/scheduledEmailMapper.js')

class ListScheduledEmailsController extends BaseController {
  async _execute (req) {
    const scheduledEmails = await this.useCase.execute()

    return scheduledEmails.map((scheduledEmail) => {
      return ScheduledEmailMapper.toDTO(scheduledEmail)
    })
  }
}

module.exports = ListScheduledEmailsController
