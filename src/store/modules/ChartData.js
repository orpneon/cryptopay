import { request } from '@/api'
import { getChartDataRequestUrl } from '@/store/helpers'

export default {
  namespaced: true,

  state: () => ({
    labels: [],
    values: [],

    convert: {
      from: 'USD',
      to: null
    }
  }),

  getters: {
    labels: state => state.labels,
    values: state => state.values,
    convert: state => state.convert,
    min: state => state.min,
    max: state => state.max
  },

  actions: {
    updateConvertCurrency({ commit, dispatch }, currency) {
      commit('setConvert', currency)
      dispatch('updateChart')
    },

    updateChart({ commit, getters }) {
      const requestUrl = getChartDataRequestUrl()
      const convert = getters.convert
      const params = {
        market: `${convert.from}-${convert.to}`
      }

      request(requestUrl, 'get', params)
        .then(data => {
          console.log(data)
        })
        .catch(error => {
          console.error(new Error(error))
        })
    }
  },

  mutations: {
    setConvert(state, currency) {
      state.convert.to = currency
    }
  }
}
