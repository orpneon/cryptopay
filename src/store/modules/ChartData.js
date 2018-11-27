import { request } from '@/api'
import { getChartDataRequestUrl } from '@/store/helpers'

export default {
  namespaced: true,

  state: () => ({
    labels: [],
    values: [],

    market: null
  }),

  getters: {
    labels: state => state.labels,
    values: state => state.values,
    market: state => state.market,
    min: state => state.min,
    max: state => state.max
  },

  actions: {
    updateConvertMarket({ commit, dispatch }, market) {
      commit('setConvertMarket', market)
    },

    updateChart({ commit, getters }) {
      const requestUrl = getChartDataRequestUrl()
      const market = getters.market

      return request(requestUrl, 'get', { market })
        .then(data => {
          console.log(data)
        })
        .catch(error => {
          console.error(new Error(error))
        })
    }
  },

  mutations: {
    setConvertMarket(state, market) {
      state.market = market
    }
  }
}
