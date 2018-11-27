import { find } from 'underscore'

const TICKER_API_URL = 'https://api.cryptonator.com/api'
const CHART_DATA_API_URL = 'https://min-api.cryptocompare.com/data/histo'

export function getTickerRequestUrl(convert) {
  const convertStr = `${convert.from.toLowerCase()}-${convert.to.toLowerCase()}`

  return `${TICKER_API_URL}/ticker/${convertStr}`
}

export function getChartDataRequestUrl(handler) {
  return `${CHART_DATA_API_URL}${handler}`
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
  const date = new Date()
  date.setTime(time * 1000)

  const Y = date.getUTCFullYear()
  const M = date.getUTCMonth() + 1
  const D = date.getUTCDate()
  const h = date.getUTCHours()
  const m = date.getUTCMinutes()
  const s = date.getUTCSeconds()
  const format = n => n < 10 ? `0${n}` : n

  return `${Y}-${M}-${D} ${format(h)}:${format(m)}:${format(s)} UTC`
}
