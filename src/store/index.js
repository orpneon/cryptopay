import Vue from 'vue'
import Vuex from 'vuex'
import Converter from '@/store/modules/Converter'
import ChartData from '@/store/modules/ChartData'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    modules: {
      'converter': Converter,
      'chart': ChartData
    }
  })
}
