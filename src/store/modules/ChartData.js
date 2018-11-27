import { request } from '@/api'
import { getChartDataRequestUrl } from '@/store/helpers'

export default {
  namespaced: true,

  state: () => ({
    labels: [],
    values: [],
    period: 1,
    min: null,
    max: null
  }),

  getters: {
    labels: state => state.labels,
    values: state => state.values,
    period: state => state.period,
    min: state => state.min,
    max: state => state.max
  },

  actions: {},

  mutations: {}
}
