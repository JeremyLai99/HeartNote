// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import NewEntry from './views/NewEntry.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/new', component: NewEntry },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
