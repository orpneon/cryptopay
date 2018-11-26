import Vue from 'vue'
import Vuex from 'vuex'
import { request } from '@/api'
import { find } from 'underscore'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      currencies: {
        from: [
          { text: 'US Dollar', value: 'USD', decimalPrecision: 2 },
          { text: 'Euro', value: 'EUR', decimalPrecision: 2 },
          { text: 'Ruble', value: 'RUR', decimalPrecision: 2 }
        ],
        to: [
          { text: 'Bitcoin', value: 'BTC', decimalPrecision: 8 },
          { text: 'Litecoin', value: 'LTC', decimalPrecision: 8 },
          { text: 'Ethereum', value: 'ETH', decimalPrecision: 8 }
        ]
      },

      convert: {
        from: 'USD',
        to: 'BTC'
      },

      amount: null,
      changed: null,
      convertedResult: null
    },

    getters: {
      currencies: state => state.currencies,
      convert: state => state.convert,
      amount: state => state.amount,
      changed: state => state.changed,
      convertedResult: state => state.convertedResult
    },

    actions: {
      updateConverted({ commit, getters }, value) {
        const convert = getters.convert
        const currencies = getters.currencies
        const convertStr = `${convert.from.toLowerCase()}-${convert.to.toLowerCase()}`

        request(`ticker/${convertStr}`, 'get')
          .then(data => {
            const current = find(currencies.to, record => convert.to === record.value)
            const decimalPrecision = current ? current.decimalPrecision : 2
            const price = +data.ticker.price
            const change = +data.ticker.change
            const amount = value || getters.amount
            const result = +(price * amount).toFixed(decimalPrecision)

            commit('setAmount', amount)
            commit('setChanged', change)
            commit('setConvertedResult', result)
          })
          .catch(error => {
            console.error(new Error(error))
          })
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
  })
}
