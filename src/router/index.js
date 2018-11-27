import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Calculator = () => import('@/views/Calculator.vue')
const Chart = () => import('@/components/Chart.vue')

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    routes: [
      {
        path: '/',
        name: 'home',
        component: Calculator,
        children: [
          {
            path: '/:market',
            name: 'chart',
            component: Chart
          }
        ]
      }
    ]
  })
}
