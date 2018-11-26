import Vue from 'vue'
import Vuex from 'vuex'

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
      convertedResult: null
    },

    getters: {
      currencies: state => state.currencies,
      convert: state => state.convert,
      amount: state => state.amount,
      convertedResult: state => state.convertedResult
    },

    actions: {
      updateConverted({ commit }, value) {
        commit('setConvertedResult', value)
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

      setConvertedResult(state, value) {
        state.convertedResult = value
      },

      clearConverted(state) {
        state.convertedResult = null
      }
    }
  })
}
