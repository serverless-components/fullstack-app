/**
 * Model: Users
 */

const AWS = require('aws-sdk')
const shortid = require('shortid')
const utils = require('../utils')

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION
})

/**
 * Register user
 * @param {string} user.email User email
 * @param {string} user.password User password
 */
const register = async(user = {}) => {

  // Validate
  if (!user.email) {
    throw new Error(`"email" is required`)
  }
  if (!user.password) {
    throw new Error(`"password" is required`)
  }
  if (!utils.validateEmailAddress(user.email)) {
    throw new Error(`"${user.email}" is not a valid email address`)
  }

  // Check if user is already registered
  const existingUser = await getByEmail(user.email)
  if (existingUser) {
    throw new Error(`A user with email "${user.email}" is already registered`)
  }

  user.password = utils.hashPassword(user.password)

  // Save
  const params = {
    TableName: process.env.db,
    Item: {
      hk: user.email,
      sk: 'user',
      sk2: shortid.generate(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      password: user.password,
    }
  }

  await dynamodb.put(params).promise()
}

/**
 * Get user by email address
 * @param {string} email
 */

const getByEmail = async(email) => {

  // Validate
  if (!email) {
    throw new Error(`"email" is required`)
  }
  if (!utils.validateEmailAddress(email)) {
    throw new Error(`"${email}" is not a valid email address`)
  }

  // Query
  const params = {
    TableName: process.env.db,
    KeyConditionExpression: 'hk = :hk',
    ExpressionAttributeValues: { ':hk': email }
  }

  let user = await dynamodb.query(params).promise()

  user = user.Items && user.Items[0] ? user.Items[0] : null
  if (user) {
    user.id = user.sk2
    user.email = user.hk
  }
  return user
}

/**
 * Get user by id
 * @param {string} id
 */

const getById = async(id) => {

  // Validate
  if (!id) {
    throw new Error(`"id" is required`)
  }

  // Query
  const params = {
    TableName: process.env.db,
    IndexName: process.env.dbIndex1,
    KeyConditionExpression: 'sk2 = :sk2 and sk = :sk',
    ExpressionAttributeValues: { ':sk2': id, ':sk': 'user' }
  }
  let user = await dynamodb.query(params).promise()

  user = user.Items && user.Items[0] ? user.Items[0] : null
  if (user) {
    user.id = user.sk2
    user.email = user.hk
  }
  return user
}

/**
 * Convert user record to public format
 * This hides the keys used for the dynamodb's single table design and returns human-readable properties.
 * @param {*} user 
 */
const convertToPublicFormat = (user = {}) => {
  user.email = user.hk || null
  user.id = user.sk2 || null
  if (user.hk) delete user.hk
  if (user.sk) delete user.sk
  if (user.sk2) delete user.sk2
  if (user.password) delete user.password
  return user
}

module.exports = {
  register,
  getByEmail,
  getById,
  convertToPublicFormat,
}
