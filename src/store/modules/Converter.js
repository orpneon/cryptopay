import { subscribe, unsubscribe } from '@/api'
import { getTickerRequestUrl, getDecimalPrecision, getChartConvertMarket } from '@/store/helpers'

export default {
  namespaced: true,

  state: () => ({
    currencies: {
      from: [
        { text: 'US Dollar', value: 'USD', decimalPrecision: 2, type: 'fiat' },
        { text: 'Euro', value: 'EUR', decimalPrecision: 2, type: 'fiat' },
        { text: 'Ruble', value: 'RUR', decimalPrecision: 2, type: 'fiat' }
      ],
      to: [
        { text: 'Bitcoin', value: 'BTC', decimalPrecision: 8, type: 'crypto' },
        { text: 'Litecoin', value: 'LTC', decimalPrecision: 8, type: 'crypto' },
        { text: 'Ethereum', value: 'ETH', decimalPrecision: 8, type: 'crypto' }
      ]
    },

    convert: {
      from: 'USD',
      to: 'BTC'
    },

    amount: null,
    changed: null,
    convertedResult: null
  }),

  getters: {
    currencies: state => state.currencies,
    convert: state => state.convert,
    amount: state => state.amount,
    changed: state => state.changed,
    convertedResult: state => state.convertedResult
  },

  actions: {
    updateConverted({ commit, getters, dispatch, root }, { value, router }) {
      const convert = getters.convert
      const currencies = getters.currencies
      const requestUrl = getTickerRequestUrl(convert)
      const market = getChartConvertMarket(currencies, convert)

      subscribe('getPrice', {
        action: requestUrl,
        method: 'get',
        callback: data => {
          const decimalPrecision = getDecimalPrecision(convert, currencies)
          const price = +data.ticker.price
          const change = +data.ticker.change
          const amount = value || getters.amount
          const result = +(price * amount).toFixed(decimalPrecision)

          commit('setAmount', amount)
          commit('setChanged', change)
          commit('setConvertedResult', result)
        },
        failure: error => {
          console.error(new Error(error))
        }
      })

      router.push(`/${market}/`)
    },

    clearConverted({ commit }, router) {
      unsubscribe('getPrice')
      commit('clearConverted')
      router.push('/')
    }
  },

  mutations: {
    swapConvert(state) {
      Object.assign(state.currencies, {
        from: state.currencies.to,
        to: state.currencies.from
      })

      Object.assign(state.convert, {
        from: state.convert.to,
        to: state.convert.from
      })
    },

    setAmount(state, value) {
      state.amount = value
    },

    setConvertedResult(state, value) {
      state.convertedResult = value
    },

    setChanged(state, value) {
      state.changed = value
    },

    clearConverted(state) {
      state.convertedResult = null
    }
  }
}
