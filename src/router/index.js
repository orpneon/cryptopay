import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Calculator = () => import('../views/Calculator.vue')

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    routes: [
      { path: '/', name: 'home', component: Calculator }
    ]
  })
}
