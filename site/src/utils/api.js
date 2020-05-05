/**
 * Utils: Back-end
 */

/**
 * Register a new user
 */
export const userRegister = async (email, password) => {
  return await requestApi('/users/register', 'POST', { email, password })
}

/**
 * Login a new user
 */
export const userLogin = async (email, password) => {
  return await requestApi('/users/login', 'POST', { email, password })
}

/**
 * userGet
 */
export const userGet = async (token) => {
  return await requestApi('/user', 'POST', null, { 
    Authorization: `Bearer ${token}`
  })
}

/**
 * API request to call the backend
 */
export const requestApi = async (
  path = '', 
  method = 'GET',
  data = null,
  headers = {}) => {

  // Prepare URL
  if (!path.startsWith('/')) {
    path = `/${path}`
  }
  const url = `${window.serverless.urls.api}${path}`

  // Set headers
  headers = Object.assign(
    { 'Content-Type': 'application/json' },
    headers
  )

  // Default options are marked with *
  const response = await fetch(url, {
    method: method.toUpperCase(),
    mode: 'cors',
    cache: 'no-cache',
    headers,
    body: data ? JSON.stringify(data) : null
  })

  if (response.status < 200 || response.status >= 300) {
    const error = await response.json()
    throw new Error(error.error)
  }

  return await response.json()
}