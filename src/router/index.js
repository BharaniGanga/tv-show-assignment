import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/HomePage.vue'
import Search from '../components/Search.vue'
import DetailsPage from '../components/DetailsPage.vue'
import ErrorPage from '../components/ErrorPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    props: true
  },

  {
    path: '/search',
    name: 'Search',
    component: Search,
    props: true
  },
  {
    path: '/details',
    name: 'DetailsPage',
    component: DetailsPage,
    props: true
  },
  {
    path: '*',
    name: 'ErrorPage',
    component: ErrorPage,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

