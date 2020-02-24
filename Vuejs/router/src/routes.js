// Define routes to component
import HomePage from './components/HomePage.vue'
import User from './components/user/User.vue'
import UserDetail from './components/user/UserDetail'
import UserIndex from './components/user/Index'
import UserEdit from './components/user/UserEdit'
import PageAbout from './components/layouts/PageAbout'

export const routes = [
  { path: '/', name: 'homepage', component: HomePage},
  { path: '/about', name: 'pageabout', component: PageAbout},
  { path: '/user', name: 'user', component: User, children: [
    { path: '', name: 'index', component: UserIndex},
    { path: ':id', name: 'userdetail', component: UserDetail},
    { path: ':id/edit', name: 'useredit', component: UserEdit}
  ]}
  // { path: '/user/:id', name: 'user-detail', component: UserDetail}
]
