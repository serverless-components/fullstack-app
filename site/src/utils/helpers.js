import Cookies from 'js-cookie'

/**
 * Format Org and Username correctly for the Serverless Platform backend
 */
export const formatOrgAndUsername = (name = '') => {
   name = name.toString().toLowerCase().replace(/[^a-z\d-]+/gi, '-')
   // Remove multiple instances of hyphens
   name = name.replace(/-{2,}/g, '-')
   if (name.length > 40) {
     name = name.substring(0, 40)
   }
   return name
}

/**
 * Parse query parameters in a URL
 * @param {*} searchString 
 */
export const parseQueryParams = (searchString = null) => {
  if (!searchString) {
    return null
  }

  // Clone string
  let clonedParams = (' ' + searchString).slice(1)

  return clonedParams
    .substr(1)
    .split('&')
    .filter((el) => el.length)
    .map((el) => el.split('='))
    .reduce(
      (accumulator, currentValue) =>
        Object.assign(accumulator, {
          [decodeURIComponent(currentValue.shift())]: decodeURIComponent(currentValue.pop())
        }),
      {}
    )
}

/**
 * Parse hash fragment parameters in a URL
 */
export const parseHashFragment = (hashString) => {
  const hashData = {}
  let hash = decodeURI(hashString)
  hash = hash.split('&')
  hash.forEach((val) => {
    val = val.replace('#', '')
    hashData[val.split('=')[0]] = val.split('=')[1]
  })
  return hashData
}

/**
 * Save session in browser cookie
 */
export const saveSession = (userId, userEmail, userToken) => {
  Cookies.set('serverless', { userId, userEmail, userToken })
}

/**
 * Get session in browser cookie
 */
export const getSession = () => {
  const data = Cookies.get('serverless')
  return data ? JSON.parse(data) : null
}

/**
 * Delete session in browser cookie
 */
export const deleteSession = () => {
  Cookies.remove('serverless')
}