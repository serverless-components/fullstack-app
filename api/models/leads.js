/**
 * Model: Leads
 */

const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION
})
const utils = require('../utils')

/**
 * Save lead
 * @param {string} email Email of the lead
 * @param {string} campaign Specific campaign (e.g. spring-promo)
 * @param {string} source Specific source of the campaign (e.g. twitter)
 * @param {string} medium Medium of the campaign (e.g. social)
 */
const save = async(
  email,
  campaign = 'none',
  source = 'none',
  medium = 'none') => {

  // Validate
  if (!email) {
    throw new Error(`"${email}" is required`)
  }
  if (!utils.validateEmailAddress(email)) {
    throw new Error(`"${email}" is not a valid email address`)
  }

  // Sanitize
  if (campaign) {
    campaign = campaign.replace(/[^a-z0-9\s-]/ig,'')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()
  }
  if (source) {
    source = source.replace(/[^a-z0-9\s-]/ig,'')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()
  }
  if (medium) {
    medium = medium.replace(/[^a-z0-9\s-]/ig,'')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()
  }

  // Save
  const params = {
    TableName: process.env.db,
    Item: {
      hk: email,
      sk: 'lead',
      campaign,
      source,
      medium,
      createdAt: Date.now()
    }
  }

  await dynamodb.put(params).promise()
}

module.exports = {
  save
}