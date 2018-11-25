// this is aliased in webpack config based on server/client build
import { createAPI } from 'create-api'

const logRequests = !!process.env.DEBUG_API
const api = createAPI()
const API_URL = ''

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
  const url = `${API_URL}${action}/?${data}`

  logRequests && console.log(`fetching ${url}...`)

  return new Promise((resolve, reject) => {
    api({ method, url, data })
      .then(response => {
        if (response.data.status === 'ok') {
          logRequests && console.log(`fetched ${url}.`)
          resolve(root ? response.data[root] : response.data)
        }
        else {
          reject('An API error has occurred', resolve)
        }
      })
      .catch((...err) => {
        reject('Axios issue', err)
      })
  })
}
