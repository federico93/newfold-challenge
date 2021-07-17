module.exports = {
  addMonths: (dateString, months) => {
    const date = new Date(dateString)

    date.setMonth(date.getMonth() + months)

    return date.toISOString().split('T')[0]
  },

  addDays: (dateString, days) => {
    const date = new Date(dateString)

    date.setDate(date.getDate() + days)

    return date.toISOString().split('T')[0]
  }
}
