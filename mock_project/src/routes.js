import Home from './components/Home.vue'

import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'

import User from './components/user/User.vue'

import AssetType from './components/assetType/AssetType'
import Purpose from './components/purpose/Purpose'

export const routes = [
  { path: '/', name: 'homepage', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/user', name: 'user', component: User },

  {path: '/asset-type', name: 'asset-type', component: AssetType },
  { path: '/purposes', name: 'purposes', component: Purpose}
]
