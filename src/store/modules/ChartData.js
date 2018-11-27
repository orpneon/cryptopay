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
    },

    periodSettings: {
      day: {
        handler: 'hour',
        limit: 23
      },
      week: {
        handler: 'day',
        limit: 6
      },
      month: {
        handler: 'day',
        limit: 30
      }
    },

    period: 'day',
    periods: ['day', 'week', 'month']
  }),

  getters: {
    labels: state => state.data.labels,
    values: state => state.data.values,
    convert: state => state.convert,
    period: state => state.period,
    periods: state => state.periods
  },

  actions: {
    updateConvertCurrency({ commit, dispatch, getters }, currency) {
      commit('setConvert', currency)
      dispatch('updateChart')
    },

    updateConvertPeriod({ commit, dispatch, getters }, period) {
      commit('setPeriod', period)
      dispatch('updateChart')
    },

    updateChart({ commit, getters, state }) {
      const convert = getters.convert
      const period = getters.period
      const limit = state.periodSettings[period].limit
      const handler = state.periodSettings[period].handler
      const requestUrl = getChartDataRequestUrl(handler)
      const params = {
        fsym: convert.to,
        tsym: convert.from,
        limit
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

    setPeriod(state, period) {
      state.period = period
    },

    setData(state, data) {
      const values = []
      const labels = []

      data.forEach(point => {
        values.push(point.open)
        labels.push(formatTime(point.time))
      })

      state.data.values = values
      state.data.labels = labels
    }
  }
}
