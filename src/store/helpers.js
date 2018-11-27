import { find } from 'underscore'

const TICKER_API_URL = 'https://api.cryptonator.com/api'
const CHART_DATA_API_URL = 'https://bittrex.com/api/v1.1/public/getmarkethistory'

export function getTickerRequestUrl(convert) {
  const convertStr = `${convert.from.toLowerCase()}-${convert.to.toLowerCase()}`

  return `${TICKER_API_URL}/ticker/${convertStr}`
}

export function getChartDataRequestUrl() {
  return CHART_DATA_API_URL
}

export function getDecimalPrecision(convert, currencies) {
  const record = find(currencies.to, record => convert.to === record.value)

  return record ? record.decimalPrecision : 2
}

export function getChartConvertCurrency(currencies, convert) {
  const record = find(currencies.from, record => convert.from === record.value)

  return record.type === 'crypto' ? convert.from : convert.to
}
