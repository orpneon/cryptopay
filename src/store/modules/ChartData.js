import { request } from '@/api'
import { getChartDataRequestUrl, formatTime } from '@/store/helpers'

export default {
  namespaced: true,

  state: () => ({
    data: {
      values: [],
      labels: []
    },

    convert: {
      from: 'USD',
      to: null
    }
  }),

  getters: {
    labels: state => state.data.labels,
    values: state => state.data.values,
    convert: state => state.convert
  },

  actions: {
    updateConvertCurrency({ commit, dispatch, getters }, currency) {
      commit('setConvert', currency)
      dispatch('updateChart')
    },

    updateChart({ commit, getters }) {
      const requestUrl = getChartDataRequestUrl()
      const convert = getters.convert
      const params = {
        fsym: convert.to,
        tsym: convert.from,
        limit: 100
      }

      request(requestUrl, 'get', params, 'Data')
        .then(data => {
          commit('setData', data)
        })
        .catch(error => {
          console.error(new Error(error))
        })
    }
  },

  mutations: {
    setConvert(state, currency) {
      state.convert.to = currency
    },

    setData(state, data) {
      const values = []
      const labels = []

      data.forEach(point => {
        values.push(point.open)
        labels.push(formatTime(point.time))
      })

      state.values = values
      state.labels = labels
    }
  }
}
