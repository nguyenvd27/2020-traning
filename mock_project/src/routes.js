import Home from './components/Home.vue'
import Contact from './components/Contact'

import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import User from './components/user/User.vue'

import AssetType from './components/assetType/AssetType'
import Purpose from './components/purpose/Purpose'
import EmployeeRole from './components/employeeRole/EmployeeRole'
import Department from './components/departments/Department'

import Employee from './components/employee/Employee'
import EmployeeNew from './components/employee/EmployeeNew'
import EmployeeDetail from './components/employee/EmployeeDetail'

import Asset from './components/asset/Asset'
import AssetNew from './components/asset/AssetNew'
import AssetDetail from './components/asset/AssetDetail'
import ImportFile from './components/asset/ImportFile'

export const routes = [
  { path: '/', name: 'homepage', component: Home, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/contact', name: 'contact', component: Contact, meta: { requiresAuth: true } },

  { path: '/profile', name: 'profile', component: Profile, meta: { requiresAuth: true }},
  { path: '/user', name: 'user', component: User, meta: { requiresAuth: true }},

  {path: '/asset-type', name: 'asset-type', component: AssetType, meta: { requiresAuth: true }},
  { path: '/purposes', name: 'purposes', component: Purpose, meta: { requiresAuth: true }},
  { path: '/employee-roles', name: 'employee-roles', component: EmployeeRole, meta: { requiresAuth: true }},
  { path: '/departments', name: 'departments', component: Department, meta: { requiresAuth: true }},

  { path: '/employees', name: 'employee', component: Employee, meta: { requiresAuth: true }},
  { path: '/employees/new', name: 'employee-new', component: EmployeeNew, meta: { requiresAuth: true }},
  { path: '/employees/:id', name: 'employee-detail', component: EmployeeDetail, meta: { requiresAuth: true }},

  {path: '/assets', name: 'asset', component: Asset, meta: { requiresAuth: true }},
  {path: '/assets/new', name: 'asset-new', component: AssetNew, meta: { requiresAuth: true }},
  {path: '/assets/import-file', name: 'import-file', component: ImportFile, meta: { requiresAuth: true }},
  {path: '/assets/:id', name: 'asset-detail', component: AssetDetail, meta: { requiresAuth: true }}
  
]
