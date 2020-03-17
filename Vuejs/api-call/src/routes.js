// Define routes to component
import HomePage from './components/HomePage.vue'
import HeaderPage from './components/HeaderPage.vue'
import Users from './components/Users.vue'

export const routes = [
  { path: '/', name: 'homepage', components: {
    default: HomePage,
    'page-header': HeaderPage
  }},
  { path: '/users', name: 'users', component: Users},
]
