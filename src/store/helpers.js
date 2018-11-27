import { find } from 'underscore'

const TICKER_API_URL = 'https://api.cryptonator.com/api'
const CHART_DATA_API_URL = 'https://min-api.cryptocompare.com/data/histoday'

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

export function formatTime(time) {
  const date = new Date(Date(time))
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  const format = n => n < 10 ? `0${n}` : n

  return `${format(h)}:${format(m)}:${format(s)} UTC`
}
