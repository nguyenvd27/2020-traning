// Define routes to component
import HomePage from './components/HomePage.vue'
import User from './components/user/User.vue'
export const routes = [
  { path: '/', name: 'hompage', component: HomePage},
  { path: '/user', name: 'user', component: User}
]
