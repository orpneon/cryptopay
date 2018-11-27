import { find } from 'underscore'

const TICKER_API_URL = 'https://api.cryptonator.com/api'
const CHART_DATA_API_URL = 'https://ru.cryptonator.com/rates/pair_ajax'

export function getTickerRequestUrl(convert) {
  const convertStr = `${convert.from.toLowerCase()}-${convert.to.toLowerCase()}`

  return `${TICKER_API_URL}/ticker/${convertStr}`
}

export function getDecimalPrecision(convert, currencies) {
  const record = find(currencies.to, record => convert.to === record.value)

  return record ? record.decimalPrecision : 2
}
