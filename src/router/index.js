import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// Views - Pages
const Login = () => import('@/views/pages/Login')

// Clients
const Conversations = () => import('@/views/clients/Conversations')
const Conversation = () => import('@/views/clients/Conversation')

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Главная',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Доска',
          component: Dashboard
        },
        {
          path: 'conversations',
          meta: { label: 'Разговоры' },
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Conversations
            },
            {
              path: ':id',
              props: true,
              meta: { label: 'Разговор' },
              component: Conversation
            }
          ]
        },
      ]
    },
    {
      path: '/login',
      name: 'Вход',
      component: Login
    }
  ]
})
