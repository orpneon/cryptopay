// this is aliased in webpack config based on server/client build
import { createAPI } from 'create-api'
import { showError, isClientEntry } from '@/api/error-handler'

const logRequests = !!process.env.DEBUG_API
const api = createAPI()
const API_URL = 'https://api.cryptonator.com/api'

function buildParams(paramsObject) {
  return Object.keys(paramsObject)
    .map(key => {
      var resultValue = paramsObject[key]

      if (typeof paramsObject[key] === 'object') {
        resultValue = JSON.stringify(paramsObject[key])
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(resultValue)}`
    })
    .join('&')
}

/**
 * Request to the API method
 * @param  {String} action      API method
 * @param  {String} method      HTTP method
 * @param  {Object} params        Request parameters
 * @param  {String} root        The response property name
 */
export function request(action, method, params = {}, root) {
  const data = buildParams(params)
  const url = `${API_URL}/${action}/?${data}`

  logRequests && console.log(`fetching ${url}...`)

  return new Promise((resolve, reject) => {
    api({ method, url, data })
      .then(response => {
        if (response.data.success === true) {
          logRequests && console.log(`fetched ${url}.`)
          resolve(root ? response.data[root] : response.data)
        } else {
          const error = response.data.error
          isClientEntry() ? showError(error) : reject(error)
        }
      })
      .catch((...err) => {
        reject('Axios issue', err)
      })
  })
}
