// this is aliased in webpack config based on server/client build
import { createAPI } from 'create-api'
import { each } from 'underscore'
import { showError, isClientEntry } from '@/api/error-handler'

const logRequests = !!process.env.DEBUG_API
const api = createAPI()
const subscriptions = {}
const DEFAULT_INTERVAL = 5 * 1000

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
 * @param  {String} action      API url
 * @param  {String} method      HTTP method
 * @param  {Object} params      Request parameters
 * @param  {String} root        The response property name
 */
export function request(action, method, params = {}, root) {
  const data = method === 'post' ? params : buildParams(params)
  const url = method === 'post' ? action : `${action}?${data}`

  logRequests && console.log(`fetching ${url}...`)

  return new Promise((resolve, reject) => {
    api({ method, url, data })
      .then(response => {
        let error

        switch (true) {
          case response.data.success === true:
          case response.data.Response === 'Success':
            logRequests && console.log(`fetched ${url}.`)
            resolve(root ? response.data[root] : response.data)
            break

          case response.data.success !== true:
            error = response.data.error
            isClientEntry() ? showError(error) : reject(error)
            break
        }
      })
      .catch(err => {
        const error = err.message || 'Request failure'
        isClientEntry() ? showError(error) : reject(error)
      })
  })
}

export function subscribe(event, params = {}, interval = DEFAULT_INTERVAL) {
  const { action, method, callback, failure, scope, data, root } = params

  if (!action || !method || !callback || !failure) {
    const error = 'Subscription failed: not all options specified'
    return isClientEntry() ? showError(error) : Promise.reject(error)
  }

  if (subscriptions[event]) {
    unsubscribe(event)
  }

  const success = scope ? callback.bind(scope) : callback
  const error = scope ? failure.bind(scope) : failure
  const requestFn = () => {
    request(action, method, data, root)
      .then(success)
      .catch(error)
  }

  requestFn()
  subscriptions[event] = setInterval(requestFn, interval)

  return Promise.resolve(subscriptions[event])
}

export function unsubscribe(event) {
  const subscription = subscriptions[event]

  subscription && clearInterval(subscriptions[event])
  delete subscriptions[event]

  return Promise.resolve()
}

export function unsubscribeAll() {
  each(subscriptions, (event, key, obj) => {
    delete obj[key]
  })

  return Promise.resolve()
}
