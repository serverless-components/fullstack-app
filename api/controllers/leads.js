/**
 * Controllers: Leads
 */

const { leads } = require('../models')

/**
 * Save Lead
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 */
const save = async (req, res, next) => {

  try {
    await leads.save(req.body.email)
  } catch(error) {
    return res.status(400).json({ error: error.message })
  }
  
  res.json({ message: 'success' })
}

module.exports = {
  save,
}